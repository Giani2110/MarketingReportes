
import React, { useState } from 'react';
import { Upload, FileText, Database, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';

export const UploadForm: React.FC = () => {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [tipo, setTipo] = useState<'csv' | 'json'>('csv');
  const [resultado, setResultado] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async () => {
    if (!archivo) {
      setError('Seleccioná un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('tipo', tipo);

    setCargando(true);
    setResultado(null);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error desconocido');
      }

      setResultado(data.mensaje);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setArchivo(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-0 m-0 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 rotate-12 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-cyan-600/20 to-blue-600/20 -rotate-12 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto p-8">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Importar Archivo
            </h1>
            <p className="text-gray-300 text-sm">Arrastra tu archivo o selecciónalo manualmente</p>
          </div>

          <div className="space-y-6">
            {/* Drag & Drop Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer
                ${dragActive 
                  ? 'border-blue-400 bg-blue-500/10' 
                  : 'border-gray-600 hover:border-gray-500'
                } ${archivo ? 'bg-green-500/10 border-green-400' : ''}`}
            >
              <input
                type="file"
                accept=".csv,.json"
                onChange={(e) => setArchivo(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center space-y-4">
                {archivo ? (
                  <>
                    <div className="relative">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setArchivo(null);
                          setError(null);
                        }}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center
                          transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                    <div>
                      <p className="text-green-400 font-medium">{archivo.name}</p>
                      <p className="text-gray-400 text-sm">{(archivo.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center">
                      <FileText className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Seleccionar archivo</p>
                      <p className="text-gray-400 text-sm">CSV o JSON</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* File Type Selector */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-300">
                Tipo de archivo
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTipo('csv')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2
                    ${tipo === 'csv' 
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400' 
                      : 'border-gray-600 hover:border-gray-500 text-gray-300'
                    }`}
                >
                  <Database className="w-5 h-5" />
                  <span className="font-medium">CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTipo('json')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2
                    ${tipo === 'json' 
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400' 
                      : 'border-gray-600 hover:border-gray-500 text-gray-300'
                    }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">JSON</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={cargando}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                disabled:from-gray-600 disabled:to-gray-700 text-white font-bold rounded-2xl
                transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                disabled:transform-none disabled:hover:translate-y-0 flex items-center justify-center space-x-2"
            >
              {cargando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Importando...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Importar Archivo</span>
                </>
              )}
            </button>

            {/* Status Messages */}
            {resultado && (
              <div className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <p className="text-green-400 font-medium">{resultado}</p>
              </div>
            )}

            {error && (
              <div className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};