import '../App.css';
import NavBar from './common/NavBar';

function LoginPage() {
  return (
    <div className='bg-black h-screen flex flex-col'>
      <NavBar />
      {/* Login Section */}
      <main className='container mx-auto flex justify-center items-center flex-grow'>
        <div className='w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-white mb-6'>
            Admin Test Page
          </h2>
        </div>
      </main>
      {/* Footer Section */}
      <footer className='py-4 text-center text-gray-300'>
        &copy; {new Date().getFullYear()} BotBazaar. All rights reserved.
      </footer>
    </div>
  );
}

export default LoginPage;
