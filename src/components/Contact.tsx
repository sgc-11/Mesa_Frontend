
const ContactForm = () => {
  return (
    <div className="bg-gradient-to-br from-pink-100 to-white p-10 rounded-lg max-w-3xl mx-auto shadow-lg text-center">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-pink-600 mb-2">Contact Us</h2>
        <p className="text-gray-600">We’d love to hear from you! Reach out for inquiries or bookings.</p>
      </div>

      <form className="space-y-5">
        <input 
          type="text" 
          placeholder="Your Name" 
          className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none text-gray-700" 
          required 
        />
        <input 
          type="email" 
          placeholder="Your Email" 
          className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none text-gray-700" 
          required 
        />
        <textarea 
          placeholder="Your Message" 
          className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:border-pink-500 focus:outline-none text-gray-700 resize-none h-36" 
          required 
        />
        <button 
          type="submit" 
          className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-300"
        >
          Submit
        </button>
      </form>

      <div className="mt-8 text-gray-600">
        <p>Email: <a href="mailto:info@business.com" className="text-pink-500 hover:underline">info@business.com</a></p>
        <p>Phone: <a href="tel:+1234567890" className="text-pink-500 hover:underline">+1 234 567 890</a></p>

        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition duration-300">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition duration-300">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 transition duration-300">Twitter</a>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
