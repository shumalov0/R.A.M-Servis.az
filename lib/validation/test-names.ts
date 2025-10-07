// Test faylı - form validasiyasını yoxlamaq üçün
// Bu faylı production-da istifadə etməyin

const NAME_REGEX = /^[\p{L}\p{M}\s\-'\.]+$/u;

// Test adları
const testNames = [
  // Azərbaycan adları
  'Əli Məmmədov',
  'Günel Əliyeva', 
  'Rəşad Həsənov',
  'Şəbnəm Quliyeva',
  'İntiqam Sümalov',
  
  // Rus adları
  'Александр Петров',
  'Екатерина Иванова',
  'Дмитрий Смирнов',
  'Анастасия Козлова',
  
  // İngilis adları
  'John Smith',
  'Mary Johnson',
  'David Brown',
  'Sarah Wilson',
  
  // Ərəb adları
  'محمد أحمد',
  'فاطمة علي',
  'عبدالله حسن',
  
  // Qarışıq və xüsusi hallar
  'Jean-Pierre Dupont',
  "O'Connor",
  'Van Der Berg',
  'Al-Rashid',
  'José María',
  'François',
  
  // Səhv nümunələr (qəbul edilməməli)
  'John123',
  'Test@Name',
  'Name#WithSymbols',
  '12345',
  'Name_With_Underscore',
];

export const testNameValidation = () => {
  console.log('🧪 Ad validasiyası testi başladı...\n');
  
  testNames.forEach((name, index) => {
    const isValid = NAME_REGEX.test(name);
    const status = isValid ? '✅' : '❌';
    console.log(`${status} ${index + 1}. "${name}" - ${isValid ? 'Qəbul edildi' : 'Rədd edildi'}`);
  });
  
  console.log('\n✨ Test tamamlandı!');
};

// Browser console-da test etmək üçün
if (typeof window !== 'undefined') {
  (window as any).testNameValidation = testNameValidation;
}