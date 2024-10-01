import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
      const re = /^(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|\\|;:,.<>?]).{8,}$/;
      return re.test(password);
    }

    function validateAgeAndBirthDate(ageInput, birthDateInput) {
      const age = parseInt(ageInput.value);
      const birthDate = new Date(birthDateInput.value);
      const today = new Date();
      const ageDifference = today.getFullYear() - birthDate.getFullYear();

      if (age !== ageDifference || (age === ageDifference && birthDate.getMonth() + 1 < today.getMonth())) {
        return false;
      }
      return true;
    }

    async function fetchCountries() {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const selectElement = document.getElementById('country');
        selectElement.innerHTML = '<option value="">Wybierz kraj</option>';
        data.forEach((country) => {
          const optionElement = document.createElement('option');
          optionElement.value = country.name.common;
          optionElement.innerHTML = `${country.name.common}`;
          selectElement.appendChild(optionElement);
        });
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    }

    function validateForm() {
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const ageInput = document.getElementById('age');
      const birthDateInput = document.getElementById('birthDate');
      const countrySelect = document.getElementById('country');
      const termsAgreement = document.getElementById('termsAgreement');

      let isValid = true;

      if (!firstName || !lastName || !email || !password || !confirmPassword || !ageInput.value || !birthDateInput.value || !countrySelect.value || !termsAgreement.checked) {
        isValid = false;
      }

      if (!validateEmail(email)) {
        alert('Podany adres email jest nieprawidłowy.');
        isValid = false;
      }

      if (!validatePassword(password)) {
        alert('Hasło musi mieć co najmniej 8 znaków, zawierać co najmniej jedną cyfrę i jeden znak specjalny.');
        isValid = false;
      }

      if (password !== confirmPassword) {
        alert('Hasła nie są zgodne.');
        isValid = false;
      }

      if (!validateAgeAndBirthDate(ageInput, birthDateInput)) {
        alert('Data urodzenia nie zgadza się z podanym wiekiem.');
        isValid = false;
      }

      return isValid;
    }

    function handleSubmit(e) {
      e.preventDefault();

      if (validateForm()) {
        alert('Rejestracja zakończona sukcesem!');
      }
    }

    submitButton.addEventListener('click', handleSubmit);

    fetchCountries();
  }, []);

  return (
    <div className="divek">
      <h1>Rejestracja</h1>
      <form id="registrationForm">
        <label htmlFor="firstName">Imię:</label>
        <input type="text" id="firstName" name="firstName" required minLength="2"/>

        <label htmlFor="lastName">Nazwisko:</label>
        <input type="text" id="lastName" name="lastName" required minLength="2"/>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required/>

        <label htmlFor="password">Hasło:</label>
        <input type="password" id="password" name="password" required pattern="^(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{}|;:,.<>?]).{8,}$"/>

        <label htmlFor="confirmPassword">Potwierdź hasło:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required/>

        <label htmlFor="age">Wiek:</label>
        <input type="number" id="age" name="age" required min="18" max="99"/>

        <label htmlFor="birthDate">Data urodzenia:</label>
        <input type="date" id="birthDate" name="birthDate" required/>

        <label htmlFor="country">Kraj:</label>
        <select id="country" name="country" required>
          <option value="">Wybierz kraj</option>
        </select>

        <label htmlFor="gender">Płeć:</label>
        <div className="radio-group">
          <label><input type="radio" name="gender" value="male"/> Mężczyzna</label>
          <label><input type="radio" name="gender" value="female"/> Kobieta</label>
        </div>

        <label htmlFor="marketingAgreement">Zgoda marketingowa:</label>
        <input type="checkbox" id="marketingAgreement" name="marketingAgreement"/>

        <label htmlFor="termsAgreement">Zgoda na regulamin:</label>
        <input type="checkbox" id="termsAgreement" name="termsAgreement" required/>

        <button id="submitButton" type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
}

export default App;
