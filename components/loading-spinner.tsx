'use client';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-border"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary animate-spin"
            style={{
              animation: 'spin 1s linear infinite',
            }}
          ></div>
        </div>
        <div className="text-center">
          <p className="text-foreground font-medium">Procesando...</p>
          <p className="text-sm text-muted-foreground">Por favor espera un momento</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
