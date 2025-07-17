type ToastProps = {
  message: string;
  show: boolean;
};

export default function Toast({ message, show }: ToastProps) {
  return (
    <div
      className={`fixed top-5 right-0 transform -translate-x-5 bg-green-600 text-white px-4 py-2 rounded shadow transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {message}
    </div>
  );
}
