import React, { useState } from 'react';

interface UserProfile {
  name: string;
  email: string;
  age: number;
}

const UserProfileForm: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías realizar acciones con los datos del perfil, como enviarlos al servidor.
    console.log('Perfil del usuario enviado:', userProfile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userProfile.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userProfile.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="age">Edad:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={userProfile.age}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Guardar Perfil</button>
    </form>
  );
};

export default UserProfileForm;
