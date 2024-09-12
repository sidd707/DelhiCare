import React, { useEffect, useRef } from 'react';

const OTPVerification: React.FC = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'Tab' &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        const index = inputsRef.current.indexOf(e.target as HTMLInputElement);
        if (index > 0) {
          inputsRef.current[index - 1]!.value = '';
          inputsRef.current[index - 1]!.focus();
        }
      }
    };

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const index = inputsRef.current.indexOf(target);
      if (target.value) {
        if (index < inputsRef.current.length - 1) {
          inputsRef.current[index + 1]!.focus();
        }
      }
    };

    const handleFocus = (e: FocusEvent) => {
      (e.target as HTMLInputElement).select();
    };

    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData('text');
      const regex = new RegExp(`^[0-9]{${inputsRef.current.length}}$`);
      if (!text || !regex.test(text)) {
        return;
      }
      const digits = text.split('');
      inputsRef.current.forEach((input, index) => (input!.value = digits[index]));
    };

    const inputs = inputsRef.current;
    inputs.forEach((input) => {
      input?.addEventListener('input', handleInput);
      input?.addEventListener('keydown', handleKeyDown);
      input?.addEventListener('focus', handleFocus);
      input?.addEventListener('paste', handlePaste);
    });

    return () => {
      inputs.forEach((input) => {
        input?.removeEventListener('input', handleInput);
        input?.removeEventListener('keydown', handleKeyDown);
        input?.removeEventListener('focus', handleFocus);
        input?.removeEventListener('paste', handlePaste);
      });
    };
  }, []);

  return (
    <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
        <p className="text-[15px] text-slate-500">
          Enter the 6-digit verification code that was sent to your phone number.
        </p>
      </header>
      <form id="otp-form">
        <div className="flex items-center justify-center gap-3">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxLength={1}
            />
          ))}
        </div>
        <div className="max-w-[260px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account
          </button>
        </div>
      </form>
      <div className="text-sm text-slate-500 mt-4">
        Didn't receive code?{' '}
        <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
          Resend
        </a>
      </div>
    </div>
  );
};

export default OTPVerification;
