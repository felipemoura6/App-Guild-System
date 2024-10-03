import { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../api.tsx';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
    user_name: string;
    user_email: string;
    user_password: string;
  }
  
export function RegisterPage() {
const [formData, setFormData] = useState<FormData>({
    user_name: '',
    user_email: '',
    user_password: ''
});

const [confirmPassword, setConfirmPassword] = useState('');
const [passwordMessage, setPasswordMessage] = useState('');
const navigate = useNavigate();

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
};

const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);

    // Validação em tempo real usando o valor direto do evento
    if (value !== null && value !== '') {
    if (formData.user_password !== value) {
        setPasswordMessage('As senhas não coincidem.');
    } else {
        setPasswordMessage('As senhas coincidem.');
    }
    } else {
    setPasswordMessage('');
    }
};

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.user_password !== confirmPassword) {
    setPasswordMessage('As senhas não coincidem.');
    return;
    }

    setPasswordMessage('');
    try {
    const response = await registerUser(formData);
    alert('Registro realizado com sucesso!');
    setFormData({
        user_name: '',
        user_email: '',
        user_password: ''
    });
    setConfirmPassword('');
    navigate("/login");
    } catch (error) {
    alert('Usuário já existente!');
    setFormData({
        user_name: '',
        user_email: '',
        user_password: ''
    });
    setConfirmPassword('');
    }
};

return (
    <form onSubmit={handleSubmit} className='bg-slate-800 w-screen h-screen flex items-center justify-center'>
    <div className='bg-slate-600 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl text-white mb-6 text-center'>Registrar</h2>
        <div className='mb-4'>
        <input
            type="text"
            name="user_name"
            placeholder="Nome"
            value={formData.user_name}
            onChange={handleChange}
            required
            className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
        <div className='mb-4'>
        <input
            type="email"
            name="user_email"
            placeholder="Email"
            value={formData.user_email}
            onChange={handleChange}
            required
            className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
        <div className='mb-4'>
        <input
            type="password"
            name="user_password"
            placeholder="Senha"
            value={formData.user_password}
            onChange={handleChange}
            required
            className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
        <div className='mb-6'>
        <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            required
            className='w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        </div>
        {passwordMessage && (
        <p className={`text-sm mb-4 ${formData.user_password !== null && confirmPassword !== null && formData.user_password === confirmPassword ? 'text-green-500' : 'text-red-500'}`}>
            {passwordMessage}
        </p>
        )}
        <button className={`w-full bg-blue-500 text-white p-3 rounded-lg ${passwordMessage !== 'As senhas coincidem.' ? 'bg-slate-500 hover:bg-slate-700 hover:cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200" type="submit`}>Registrar</button>
        <div className='text-center mt-4'>
        <Link to='/login' className='text-sm text-blue-300 hover:underline'>Já tenho uma conta</Link>
        </div>
    </div>
    </form>
);
}
  