import { RouterProvider } from 'react-router';
import { router } from './routes';
import { DarkModeProvider } from './context/DarkModeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <LanguageProvider>
      <DarkModeProvider>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </DarkModeProvider>
    </LanguageProvider>
  );
}