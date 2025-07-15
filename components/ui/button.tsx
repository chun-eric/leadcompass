
interface ButtonProps {
  children: string;
  onClick?: () => void;
  variant?: "primary" | "secondary"
}

export function Button({ children, onClick, variant = "primary"}: ButtonProps) {
  const styles = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
  }

  return (
    <button onClick={onClick} className={`px-4 py-2 rounded font-medium ${styles[variant]}`} >
      {children}
    </button>
  )
}
