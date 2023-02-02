import { Header } from '@/components/Header';
import { SummaryTable } from '@/components/SummaryTable';
import '@/plugins/moment';
import '@/styles/global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center select-none">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTable />
        <ToastContainer
          theme="dark"
          autoClose={3000}
          closeOnClick={true}
          position="top-right"
        />
      </div>
    </div>
  );
}
