'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Upload, Mail, Lock, User, Shield } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  credentialFile: File | null;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  credentialFile?: string;
}

export default function RegistroPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    credentialFile: null,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo válido';
    } else if (!formData.email.includes('@tecno.edu.') && !formData.email.includes('@tecno.')) {
      newErrors.email = 'Debes usar tu correo institucional del Tecno (@tecno.edu.*)';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!formData.credentialFile) {
      newErrors.credentialFile = 'Debes subir tu carnet estudiantil';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, credentialFile: file }));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Create new user
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        id: `user-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        password: formData.password, // In a real app, this would be hashed
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        verified: false,
        credentialImage: fileName || '',
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setIsLoading(false);
      setIsSuccess(true);

      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          credentialFile: null,
        });
        setFileName(null);
        setIsSuccess(false);
        window.location.href = '/login';
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <LoadingSpinner />}

      <Navbar />

      {/* Header */}
      <section className="bg-linear-to-r from-primary/10 to-accent/10 border-b border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Únete a Tecno Living
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crea tu cuenta y comienza a buscar tu alojamiento ideal hoy mismo
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl border border-border shadow-lg p-8">
            {isSuccess ? (
              // Success Message
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle className="text-primary" size={48} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-3">¡Bienvenido a Tecno Living!</h2>
                <p className="text-muted-foreground mb-6">
                  Tu cuenta ha sido creada exitosamente. Tu credencial está siendo verificada.
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-left space-y-2">
                  <p className="font-semibold text-foreground flex items-center gap-2">
                    <Shield size={18} className="text-primary" />
                    Próximos pasos
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-7">
                    <li>• Tu credencial será verificada en 24-48 horas</li>
                    <li>• Recibirás un email cuando tu cuenta esté activada</li>
                    <li>• Luego podrás reservar habitaciones</li>
                  </ul>
                </div>
              </div>
            ) : (
              // Registration Form
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="font-semibold text-foreground block mb-2">
                    <div className="flex items-center gap-2">
                      <User size={18} className="text-primary" />
                      Nombre Completo
                    </div>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`rounded-lg border-border ${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="font-semibold text-foreground block mb-2">
                    <div className="flex items-center gap-2">
                      <Mail size={18} className="text-primary" />
                      Correo Institucional
                    </div>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan.perez@tecno.edu.co"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`rounded-lg border-border ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.email}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">Usa tu correo del Tecno para verificación</p>
                </div>

                {/* Password Field */}
                <div>
                  <Label htmlFor="password" className="font-semibold text-foreground block mb-2">
                    <div className="flex items-center gap-2">
                      <Lock size={18} className="text-primary" />
                      Contraseña
                    </div>
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`rounded-lg border-border ${errors.password ? 'border-red-500' : ''}`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <Label htmlFor="confirmPassword" className="font-semibold text-foreground block mb-2">
                    <div className="flex items-center gap-2">
                      <Lock size={18} className="text-primary" />
                      Confirmar Contraseña
                    </div>
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`rounded-lg border-border ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Credential Upload */}
                <div>
                  <Label className="font-semibold text-foreground block mb-2">
                    <div className="flex items-center gap-2">
                      <Shield size={18} className="text-primary" />
                      Carnet Estudiantil
                    </div>
                  </Label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      errors.credentialFile
                        ? 'border-red-400 bg-red-50'
                        : 'border-border hover:border-primary bg-muted/30 hover:bg-muted/50'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      aria-label="Subir carnet estudiantil"
                    />
                    {fileName ? (
                      <div>
                        <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                        <p className="font-semibold text-foreground">{fileName}</p>
                        <p className="text-xs text-muted-foreground">Haz clic para cambiar archivo</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="font-semibold text-foreground">Sube tu carnet</p>
                        <p className="text-xs text-muted-foreground">Arrastra o haz clic para seleccionar</p>
                      </div>
                    )}
                  </div>
                  {errors.credentialFile && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.credentialFile}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Formatos aceptados: JPG, PNG, PDF (máx 5MB)
                  </p>
                </div>

                {/* Agreement */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    Al registrarte, aceptas nuestros <a href="#" className="text-primary hover:underline">Términos de Servicio</a> y{' '}
                    <a href="#" className="text-primary hover:underline">Política de Privacidad</a>
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold rounded-lg"
                >
                  Crear Cuenta
                </Button>

                {/* Login Link */}
                <p className="text-center text-muted-foreground">
                  ¿Ya tienes cuenta?{' '}
                  <a href="/login" className="text-primary hover:underline font-semibold">
                    Inicia sesión
                  </a>
                </p>
              </form>
            )}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Seguro</h3>
              <p className="text-sm text-muted-foreground">
                Tus datos están protegidos con encriptación SSL
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Rápido</h3>
              <p className="text-sm text-muted-foreground">
                Verifica tu identidad en 24-48 horas
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <User className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Exclusivo</h3>
              <p className="text-sm text-muted-foreground">
                Solo para estudiantes del Tecno
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
