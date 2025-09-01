'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from '@/lib/translations';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const [currentLang, setCurrentLang] = useState('az');
  const t = useTranslation(currentLang);

  useEffect(() => {
    const savedLang = localStorage.getItem('ramservis_language');
    if (savedLang && ['az', 'en', 'ru', 'ar'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('ramservis_language', lang);
  };

  const contactContent: Record<'az'|'en'|'ru'|'ar', {
    title: string; subtitle: string; address: string; addressText: string; phone: string; phoneText: string; email: string; emailText: string; workingHours: string; mondayFriday: string; saturday: string; sunday: string; formTitle: string; name: string; emailLabel: string; message: string; send: string;
  }> = {
    az: {
      title: "Əlaqə",
      subtitle: "Sualınız varsa, bizimlə əlaqə saxlayın. 7/24 sizə kömək etməyə hazırıq.",
      address: "Ünvan",
      addressText: "Bakı, Azərbaycan",
      phone: "Telefon",
      phoneText: "+994 70 700 44 44",
      email: "Email",
      emailText: "info@ramservis.az",
      workingHours: "İş Saatları",
      mondayFriday: "Bazar ertəsi - Cümə: 09:00 - 18:00",
      saturday: "Şənbə: 09:00 - 16:00",
      sunday: "Bazar: Bağlı",
      formTitle: "Bizə Yazın",
      name: "Adınız",
      emailLabel: "Email ünvanınız",
      message: "Mesajınız",
      send: "Göndər",
    },
    en: {
      title: "Contact",
      subtitle: "If you have any questions, contact us. We are ready to help you 24/7.",
      address: "Address",
      addressText: "27A Ahmed Racabli Baku Narimanov",
      phone: "Phone",
      phoneText: "+994 70 700 44 44",
      email: "Email",
      emailText: "info@ramservis.az",
      workingHours: "Working Hours",
      mondayFriday: "Monday - Friday: 09:00 - 19:00",
      saturday: "Saturday: 09:00 - 19:00",
      sunday: "Saturday: 09:00 - 19:00",
      formTitle: "Write to Us",
      name: "Your Name",
      emailLabel: "Your Email",
      message: "Your Message",
      send: "Send",
    },
    ru: {
      title: "Контакты",
      subtitle: "Если у вас есть вопросы, свяжитесь с нами. Мы готовы помочь вам 24/7.",
      address: "Адрес",
      addressText: "Баку, Азербайджан",
      phone: "Телефон",
      phoneText: "+994 70 700 44 44",
      email: "Email",
      emailText: "info@ramservis.az",
      workingHours: "Часы работы",
      mondayFriday: "Понедельник - Пятница: 09:00 - 18:00",
      saturday: "Суббота: 09:00 - 16:00",
      sunday: "Воскресенье: Закрыто",
      formTitle: "Напишите нам",
      name: "Ваше имя",
      emailLabel: "Ваш Email",
      message: "Ваше сообщение",
      send: "Отправить",
    },
    ar: {
      title: "اتصل بنا",
      subtitle: "إذا كانت لديك أي أسئلة، تواصل معنا. نحن مستعدون لمساعدتك 24/7.",
      address: "العنوان",
      addressText: "باكو، أذربيجان",
      phone: "الهاتف",
      phoneText: "+994 70 855 90 01",
      email: "البريد الإلكتروني",
      emailText: "info@ramservis.az",
      workingHours: "ساعات العمل",
      mondayFriday: "الاثنين - الجمعة: 09:00 - 18:00",
      saturday: "السبت: 09:00 - 16:00",
      sunday: "الأحد: مغلق",
      formTitle: "اكتب إلينا",
      name: "اسمك",
      emailLabel: "بريدك الإلكتروني",
      message: "رسالتك",
      send: "إرسال",
    }
  };

  const content = contactContent[(currentLang as 'az'|'en'|'ru'|'ar')] || contactContent.az;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    alert('Mesajınız uğurla göndərildi!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-zinc-50 to-gray-50 dark:from-zinc-800 dark:bg-brand-dark/70  transition-colors duration-300">
      <Header currentLang={currentLang} handleLanguageChange={handleLanguageChange} t={t} />
      
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {content.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {content.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-brand-dark/70  rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {content.formTitle}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg  :ring-2  :ring-amber-500  :border-amber-500 dark:bg-brand-dark/70  dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg  :ring-2  :ring-amber-500  :border-amber-500 dark:bg-brand-dark/70  dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {content.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg  :ring-2  :ring-amber-500  :border-amber-500 dark:bg-brand-dark/70  dark:text-white"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#f5b754] hover:bg-amber-700 text-white py-3 px-6 rounded-lg transition-colors"
                >
                  {content.send}
                </Button>
              </form>
            </div>

            <div>
              <div className="bg-white dark:bg-brand-dark/70  rounded-2xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t.contactInfo}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-amber-100 dark:bg-brand-dark/70 p-3 rounded-full mr-4">
                      <MapPin className="h-5 w-5 text-brand-gold dark:text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{content.address}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{content.addressText}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 dark:bg-brand-dark/70  p-3 rounded-full mr-4">
                      <Phone className="h-5 w-5 text-brand-gold dark:text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{content.phone}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{content.phoneText}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 dark:bg-brand-dark/70  p-3 rounded-full mr-4">
                      <Mail className="h-5 w-5 text-brand-gold dark:text-brand-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{content.email}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{content.emailText}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-brand-dark/70  rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {content.workingHours}
                </h2>
                
                <div className="space-y-4 dark:bg-brand-dark/70 ">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-brand-dark/70">
                    <span className="text-gray-600 dark:text-gray-300">{content.mondayFriday}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-brand-dark/70">
                    <span className="text-gray-600 dark:text-gray-300">{content.saturday}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-300">{content.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer t={t} />
    </div>
  );
}