// Declarations
const questionText = document.getElementById("question_text");
const correct = document.getElementById("correct");
const incorrect = document.getElementById("incorrect");
const answerCount = document.getElementById("answer-count");
const answers = document.getElementById("answers");
const countdown = document.getElementById("c");
const soundButton = document.querySelector(".sound-button");
const body = document.body;
const nav = document.querySelector("nav");
const main = document.querySelector("main");
let mute = false;
let num = 20;
let choosed = 0;
let countInterval = -1;
let i = 0;
let correctAnswerCount = 0;
let selected;
let gameArray = null;

if (!localStorage.getItem("selected")) {
    selected = false;
} else {
    selected = true;
}

// Main array which stores questions and answers
const mainAz = [
    {
        question: "Tesla kompaniyasının direktoru kimdir?",
        options: [
            { option: "Elon Musk" },
            { option: "Mark Zuckerberg" },
            { option: "Steve Jobs" },
            { option: "Tim Cook" },
        ],
        answer: [0],
    },
    {
        question: "Windows OS-ni kim yaratdı?",
        options: [
            { option: "Jeff Bezos" },
            { option: "Shantanu Narayen" },
            { option: "Bill Gates" },
            { option: "Satya Nadella" },
        ],
        answer: [2],
    },
    {
        question: "Ən dərin göl hansıdır?",
        options: [
            { option: "Miçiqan" },
            { option: "Şərq" },
            { option: "Baykal" },
            { option: "San Martin" },
        ],
        answer: [2],
    },
    {
        question: "Coğrafiya nə deməkdir?",
        options: [
            { option: "Dünyanın xəritəsi" },
            { option: "Xəritənin təsviri" },
            { option: "Dünyanın təsviri" },
            { option: "Həyatın xəritəsi" },
        ],
        answer: [2],
    },
    {
        question: "Bitcoin-in yaradıcısı kimdir?",
        options: [
            { option: "Shantanu Narayen" },
            { option: "Sundar Pichai" },
            { option: "Arvind Krishna" },
            { option: "Satoshi Nakamato" },
        ],
        answer: [3],
    },
    {
        question: "Facebook-un yaradıcısı kimdir?",
        options: [
            { option: "Sundar Pichai" },
            { option: "Satoshi Nakamato" },
            { option: "Mark Zuckerberg" },
            { option: "Satya Nadella" },
        ],
        answer: [2],
    },
    {
        question: "Birinci kompüter neçənci ildə icad olunmuşdur?",
        options: [
            { option: "1946" },
            { option: "1949" },
            { option: "1978" },
            { option: "1990" },
        ],
        answer: [0],
    },
    {
        question: "NFT nədir?",
        options: [
            { option: "Təsvir formatı" },
            { option: "National-fungible token" },
            { option: "Non-fungible token" },
            { option: "Non-findible token" },
        ],
        answer: [2],
    },
    {
        question: "ABŞ-da neçə ştat var?",
        options: [
            { option: "15" },
            { option: "40" },
            { option: "50" },
            { option: "51" },
        ],
        answer: [2],
    },
    {
        question: "Avto pilot avtomobil neçənci ildə icad olunmuşdur?",
        options: [
            { option: "1999" },
            { option: "2009" },
            { option: "2017" },
            { option: "1980" },
        ],
        answer: [3],
    },
    {
        question: "Yer üzündəki ən böyük heyvan hansıdır?",
        options: [
            { option: "Afrika fili" },
            { option: "Mavi balina" },
            { option: "Sperma balina" },
            { option: "Nəhəng kalmar" },
        ],
        answer: [1],
    },
    {
        question: "Bitki və yağ yeyən heyvanın adı nədir?",
        options: [
            { option: "Ətyeyən" },
            { option: "Otyeyən" },
            { option: "Hərtərəfli yeyən" },
            { option: "Peskatarian" },
        ],
        answer: [2],
    },
    {
        question: "Su samuruları niyə bir birilərinin əllərindən yapışırlar?",
        options: [
            { option: "Çünki onlar bir birilərini sevirlər" },
            { option: "Çünki onlar oynayırlar" },
            { option: "Bir ailədən olduğlarını göstərmək üçün" },
            { option: "Yatanda uzağa üzməmək üçün" },
        ],
        answer: [3],
    },
    {
        question: "Niyə ilanlar dillərini çıxarır?",
        options: [
            { option: "Yırtıcıları qorxutmaq üçün" },
            { option: "Ovunu yalamaq üçün" },
            { option: "Fısıltı səsi çıxarmaq üçün" },
            { option: "Havanı qoxlamaq üçün" },
        ],
        answer: [3],
    },
    {
        question: "Trilyondan sonra hansı rəqəm gəlir?",
        options: [
            { option: "Milyard" },
            { option: "Kvadrilyon" },
            { option: "Kvintilyon" },
            { option: "Quqol" },
        ],
        answer: [1],
    },
    {
        question: "Rayt qardaşları nəyi icad etdilər və sınadılar?",
        options: [
            { option: "Kompüter" },
            { option: "Maşın" },
            { option: "Telefon" },
            { option: "Təyyarə" },
        ],
        answer: [3],
    },
    {
        question: "Olimpiya Oyunları haradan qaynaqlanır?",
        options: [
            { option: "Qədim Yunanıstanda" },
            { option: "Qədim Romada" },
            { option: "Orta əsr İngiltərəsi ərazisində" },
            { option: "Avstraliyada" },
        ],
        answer: [0],
    },
    {
        question: "Ən böyük dönmə çarxı hansı ölkədədir?",
        options: [
            { option: "İngiltərə" },
            { option: "Çin" },
            { option: "ABŞ" },
            { option: "BƏƏ" },
        ],
        answer: [2],
    },
    {
        question: "Piramidalar niyə tikilib?",
        options: [
            { option: "Onlar məzar kimi xidmət edirdilər" },
            { option: "Fironların sarayları idilər" },
            { option: "Müdafiə nöqtələri idilər" },
            { option: "Piramidalar otellər idi" },
        ],
        answer: [0],
    },
    {
        question: "Dünyanın ən dərin yerinin adı nədir?",
        options: [
            { option: "Ölüm Vadisi" },
            { option: "Mariana Xəndəyi" },
            { option: "Krater Gölü" },
            { option: "D.Verevkina mağarası" },
        ],
        answer: [1],
    },
    {
        question: "Ən yüksək dağ hansıdır?",
        options: [
            { option: "Everest" },
            { option: "Çimborazo dağı" },
            { option: "Mauna-Kea" },
            { option: "Burj Khalifa" },
        ],
        answer: [0],
    },
    {
        question: "Yerdəki ən böyük su hövzəsi hansıdır?",
        options: [
            { option: "Atlantik Okeanı" },
            { option: "Hind Okeanı" },
            { option: "Sakit Okean" },
            { option: "Xəzər dənizi" },
        ],
        answer: [2],
    },
    {
        question: "İnsan bədənində ən sürətli əzələ hardadır?",
        options: [
            { option: "Ayağlarda" },
            { option: "Əllərdə" },
            { option: "Barmağlarda" },
            { option: "Gözlərdə" },
        ],
        answer: [3],
    },
    {
        question: "Yetkin insan orqanizmində neçə sümük var?",
        options: [
            { option: "501" },
            { option: "105" },
            { option: "206" },
            { option: "347" },
        ],
        answer: [2],
    },
    {
        question: "İnsan bədənindəki ən sərt maddə hansıdır?",
        options: [
            { option: "Sümük" },
            { option: "Saç" },
            { option: "Dırnaq" },
            { option: "Diş" },
        ],
        answer: [3],
    },
    {
        question: "Qasırğa ilə tayfun arasındakı fərq nədir?",
        options: [
            { option: "Tayfunlar qasırğalardan güclüdür" },
            { option: "Onların baş verdiyi yerdən başqa heçnə" },
            {
                option: "Tayfunlar quruda, qasırğalar su üzərində baş verir",
            },
            { option: "Qasırğalar daha yavaş hərəkət edir" },
        ],
        answer: [1],
    },
    {
        question: "Günəş hansı istiqamətdə çıxır?",
        options: [
            { option: "Şimal" },
            { option: "Cənub" },
            { option: "Şərqi" },
            { option: "Qərb" },
        ],
        answer: [2],
    },
    {
        question: "İnsanın ilk kosmosa uçuşu nə vaxt baş verdi?",
        options: [
            { option: "1973" },
            { option: "1956" },
            { option: "1965" },
            { option: "1961" },
        ],
        answer: [3],
    },
    {
        question: "Ornitorenk digər məməlilərdən nə ilə fərqlənir?",
        options: [
            { option: "Ördək kimi qaqqıldayır" },
            { option: "Yumurta qoyur" },
            { option: "Yuvalar qurur" },
            { option: "Çuxurlar açır" },
        ],
        answer: [1],
    },
    {
        question: "Ən qısa gün hansı planetdədir?",
        options: [
            { option: "Merkuri" },
            { option: "Dünya" },
            { option: "Neptun" },
            { option: "Yupiter" },
        ],
        answer: [3],
    },
    {
        question: "Hansı ulduz dünyaya ən yaxınıdır?",
        options: [
            { option: "Qütb ulduzu" },
            { option: "Sirius" },
            { option: "Günəş" },
            { option: "Andromeda" },
        ],
        answer: [2],
    },
    {
        question: "Fevral 15, 2013-də dünyaya düşən meteoritin adı nədir?",
        options: [
            { option: "Tunguska" },
            { option: "Çelyabinsk" },
            { option: "Qoba" },
            { option: "Allende" },
        ],
        answer: [1],
    },
    {
        question: "Palamutlardan hansı ağaclar bitir?",
        options: [
            { option: "Palıd" },
            { option: "Ağcaqayın" },
            { option: "Hikori" },
            { option: "Qoz" },
        ],
        answer: [0],
    },
    {
        question: "Göy qurşağında neçə rəng var?",
        options: [
            { option: "7" },
            { option: "10" },
            { option: "6" },
            { option: "8" },
        ],
        answer: [0],
    },
    {
        question: "Aztek imperiyası harada yerləşirdi?",
        options: [
            { option: "Cənubi Amerikada" },
            { option: "Afrikada" },
            { option: "Müasir Meksika ərazisində" },
            { option: "Şimali Amerikada" },
        ],
        answer: [2],
    },
    {
        question: "Çin mədəniyyətinə ən təsirli simvol nədir?",
        options: [
            { option: "Meymun" },
            { option: "Əjdaha" },
            { option: "Sıçovul" },
            { option: "İt" },
        ],
        answer: [1],
    },
];

const mainEn = [
    {
        question: "Who is the CEO of the Tesla company?",
        options: [
            { option: "Elon Musk" },
            { option: "Mark Zuckerberg" },
            { option: "Steve Jobs" },
            { option: "Tim Cook" },
        ],
        answer: [0],
    },
    {
        question: "Who created the Windows OS?",
        options: [
            { option: "Jeff Bezos" },
            { option: "Shantanu Narayen" },
            { option: "Bill Gates" },
            { option: "Satya Nadella" },
        ],
        answer: [2],
    },
    {
        question: "What is the deepest lake?",
        options: [
            { option: "Michigan" },
            { option: "East" },
            { option: "Baikal" },
            { option: "San Martin" },
        ],
        answer: [2],
    },
    {
        question: "What does the Geography mean?",
        options: [
            { option: "Map of the Earth" },
            { option: "Description of the Map" },
            { option: "Description of the Earth" },
            { option: "Map of the Life" },
        ],
        answer: [2],
    },
    {
        question: "Who is the creator of Bitcoin?",
        options: [
            { option: "Shantanu Narayen" },
            { option: "Sundar Pichai" },
            { option: "Arvind Krishna" },
            { option: "Satoshi Nakamato" },
        ],
        answer: [3],
    },
    {
        question: "Who is the creator of the Facebook?",
        options: [
            { option: "Sundar Pichai" },
            { option: "Satoshi Nakamato" },
            { option: "Mark Zuckerberg" },
            { option: "Satya Nadella" },
        ],
        answer: [2],
    },
    {
        question: "When did the first computer invented?",
        options: [
            { option: "1946" },
            { option: "1949" },
            { option: "1978" },
            { option: "1990" },
        ],
        answer: [0],
    },
    {
        question: "What is NFT?",
        options: [
            { option: "Format of a picture" },
            { option: "National-fungible token" },
            { option: "Non-fungible token" },
            { option: "Non-findible token" },
        ],
        answer: [2],
    },
    {
        question: "How many states are there in the USA?",
        options: [
            { option: "15" },
            { option: "40" },
            { option: "50" },
            { option: "51" },
        ],
        answer: [2],
    },
    {
        question: "When did the first self-driving car invented?",
        options: [
            { option: "1999" },
            { option: "2009" },
            { option: "2017" },
            { option: "1980" },
        ],
        answer: [3],
    },
    {
        question: "What is the largest animal on Earth?",
        options: [
            { option: "African elephant" },
            { option: "Blue whale" },
            { option: "Sperm whale" },
            { option: "Giant squid" },
        ],
        answer: [1],
    },
    {
        question: "What is the name of the animal that eats plants and oil?",
        options: [
            { option: "Carnivore" },
            { option: "Herbivore" },
            { option: "Omnivore" },
            { option: "Pescatarian" },
        ],
        answer: [2],
    },
    {
        question: "Why do sea otters cling to hands?",
        options: [
            { option: "Because they love each other" },
            { option: "Because they play" },
            { option: "To show that they are in the same family" },
            { option: "To not swim away when they sleep" },
        ],
        answer: [3],
    },
    {
        question: "Why do snakes stick out their tongues?",
        options: [
            { option: "To scare predators" },
            { option: "To lick prey" },
            { option: "To make a hissing sound" },
            { option: "To sniff the air" },
        ],
        answer: [3],
    },
    {
        question: "What number comes after a trillion?",
        options: [
            { option: "Billion" },
            { option: "Quadrillion" },
            { option: "Quintillion" },
            { option: "Googol" },
        ],
        answer: [1],
    },
    {
        question: "What did the Wright brothers invent and test?",
        options: [
            { option: "Computer" },
            { option: "Car" },
            { option: "Phone" },
            { option: "Airplane" },
        ],
        answer: [3],
    },
    {
        question: "Where does the Olympic Games originate?",
        options: [
            { option: "In ancient Greece" },
            { option: "In ancient Rome" },
            { option: "In the territory of the Medieval England" },
            { option: "In Australia" },
        ],
        answer: [0],
    },
    {
        question: "Which country has the largest Ferris wheel?",
        options: [
            { option: "England" },
            { option: "China" },
            { option: "USA" },
            { option: "UAE" },
        ],
        answer: [2],
    },
    {
        question: "Why were the pyramids built?",
        options: [
            { option: "They served as tombs" },
            { option: "They were palaces of the pharaohs" },
            { option: "They were defensive points" },
            { option: "Pyramids were hotels" },
        ],
        answer: [0],
    },
    {
        question: "What is the name the deepest place in the world?",
        options: [
            { option: "Death Valley" },
            { option: "Mariana Trench" },
            { option: "Crater Lake" },
            { option: "D.Verevkina Cave" },
        ],
        answer: [1],
    },
    {
        question: "Which mountain has the highest altitude?",
        options: [
            { option: "Everest" },
            { option: "Mount Chimborazo" },
            { option: "Mauna-Kea" },
            { option: "Burj Khalifa" },
        ],
        answer: [0],
    },
    {
        question: "What is the largest body of water on Earth?",
        options: [
            { option: "Atlantic Ocean" },
            { option: "Indian Ocean" },
            { option: "Pacific Ocean" },
            { option: "Caspian Sea" },
        ],
        answer: [2],
    },
    {
        question: "Where is the fastest muscle in the body?",
        options: [
            { option: "Leg" },
            { option: "Hand" },
            { option: "Finger" },
            { option: "Eye" },
        ],
        answer: [3],
    },
    {
        question: "How many bones are in an adult human body?",
        options: [
            { option: "501" },
            { option: "105" },
            { option: "206" },
            { option: "347" },
        ],
        answer: [2],
    },
    {
        question: "What is the hardest substance in the human body?",
        options: [
            { option: "Bones" },
            { option: "Hairs" },
            { option: "Nails" },
            { option: "Teeths" },
        ],
        answer: [3],
    },
    {
        question: "What is the difference between a hurricane and a typhoon?",
        options: [
            { option: "Typhoons are stronger than hurricanes" },
            { option: "Nothing but location where they happen" },
            {
                option: "Typhoons happen over land, hurricanes happen over water",
            },
            { option: "Hurricanes move more slowly" },
        ],
        answer: [1],
    },
    {
        question: "In which direction does the sun rise?",
        options: [
            { option: "North" },
            { option: "South" },
            { option: "East" },
            { option: "West" },
        ],
        answer: [2],
    },
    {
        question: "When did the first manned space flight take place?",
        options: [
            { option: "1973" },
            { option: "1956" },
            { option: "1965" },
            { option: "1961" },
        ],
        answer: [3],
    },
    {
        question: "How is the platypus different from other mammals?",
        options: [
            { option: "Quacks like a duck" },
            { option: "Lays eggs" },
            { option: "Builds nests" },
            { option: "Waddles" },
        ],
        answer: [1],
    },
    {
        question: "Which planet has the shortest day?",
        options: [
            { option: "Mercury" },
            { option: "Earth" },
            { option: "Neptune" },
            { option: "Jupiter" },
        ],
        answer: [3],
    },
    {
        question: "Which star is closest to Earth?",
        options: [
            { option: "Pole star" },
            { option: "Sirius" },
            { option: "Sun" },
            { option: "Andromeda" },
        ],
        answer: [2],
    },
    {
        question:
            "What is the name of the meteorite that hit Earth on February 15, 2013?",
        options: [
            { option: "Tunguska" },
            { option: "Chelyabinsk" },
            { option: "Goba" },
            { option: "Allende" },
        ],
        answer: [1],
    },
    {
        question: "What trees grow from acorns?",
        options: [
            { option: "Oak" },
            { option: "Maple" },
            { option: "Hickory" },
            { option: "Walnut" },
        ],
        answer: [0],
    },
    {
        question: "How many colors are in the rainbow?",
        options: [
            { option: "7" },
            { option: "10" },
            { option: "6" },
            { option: "8" },
        ],
        answer: [0],
    },
    {
        question: "Where was the Aztec empire located?",
        options: [
            { option: "In South America" },
            { option: "In Africa" },
            { option: "On the territory of modern Mexico" },
            { option: "In North America" },
        ],
        answer: [2],
    },
    {
        question:
            "What is the name of the most influental symbol in Chinese culture?",
        options: [
            { option: "Monkey" },
            { option: "Dragon" },
            { option: "Rat" },
            { option: "Dog" },
        ],
        answer: [1],
    },
];

const mainRu = [
    {
        question: "Кто главный исполнителный директор компаний Tesla?",
        options: [
            { option: "Илон Маск" },
            { option: "Марк Зукерберг" },
            { option: "Стив Джобс" },
            { option: "Тим Кук" },
        ],
        answer: [0],
    },
    {
        question: "Кто создал оперативную систему Windows?",
        options: [
            { option: "Джеф Безос" },
            { option: "Шантану Нарайен" },
            { option: "Билл Гейтс" },
            { option: "Сатйа Наделла" },
        ],
        answer: [2],
    },
    {
        question: "Какое озеро самое глубокое?",
        options: [
            { option: "Мичиган" },
            { option: "Восток" },
            { option: "Байкал" },
            { option: "Сан-Мартин" },
        ],
        answer: [2],
    },
    {
        question: "Что означает География?",
        options: [
            { option: "Карта Земли" },
            { option: "Описание Карты" },
            { option: "Описание Земли" },
            { option: "Карта Жизни" },
        ],
        answer: [2],
    },
    {
        question: "Кто создатель Биткоина?",
        options: [
            { option: "Шантану Нарайен" },
            { option: "Сундар Пичаи" },
            { option: "Арвинд Кришна" },
            { option: "Сатоши Накамато" },
        ],
        answer: [3],
    },
    {
        question: "Кто создатель Facebook-а?",
        options: [
            { option: "Сундар Пичаи" },
            { option: "Сатоши Накамато" },
            { option: "Марк Зукерберг" },
            { option: "Сатйа Наделла" },
        ],
        answer: [2],
    },
    {
        question: "В каком году появился первый компьютер?",
        options: [
            { option: "1946" },
            { option: "1949" },
            { option: "1978" },
            { option: "1990" },
        ],
        answer: [0],
    },
    {
        question: "Что такое NFT?",
        options: [
            { option: "Тип Биткоина" },
            { option: "National-fungible token" },
            { option: "Non-fungible token" },
            { option: "Non-findible token" },
        ],
        answer: [2],
    },
    {
        question: "Сколько штатов есть в США?",
        options: [
            { option: "15" },
            { option: "40" },
            { option: "50" },
            { option: "51" },
        ],
        answer: [2],
    },
    {
        question: "Когда появилься первый самоуправляемый автомобиль?",
        options: [
            { option: "1999" },
            { option: "2009" },
            { option: "2017" },
            { option: "1980" },
        ],
        answer: [3],
    },
    {
        question: "Какое животное самое крупное на Земле?",
        options: [
            { option: "Африканский слон" },
            { option: "Синий кит" },
            { option: "Кашалот" },
            { option: "Гигантский кальмар" },
        ],
        answer: [1],
    },
    {
        question:
            "Как называется животное, которое употребляет в пищу растения и масло?",
        options: [
            { option: "Плотоядное животное" },
            { option: "Травоядное животное" },
            { option: "Всеядное животное" },
            { option: "Пескатариан" },
        ],
        answer: [2],
    },
    {
        question: "Почему каланы держатся за руки?",
        options: [
            { option: "Потому что они любят друг друга" },
            { option: "Потому что они играют" },
            { option: "Чтобы показать, что они в одной семье" },
            { option: "Чтобы не уплывали, когда спят" },
        ],
        answer: [3],
    },
    {
        question: "Почему змеи высовывают язык?",
        options: [
            { option: "Чтобы напугать хищников" },
            { option: "Чтобы облизать добычу" },
            { option: "Чтобы издать шипящий звук" },
            { option: "Чтобы понюхать воздух" },
        ],
        answer: [3],
    },
    {
        question: "Какое число идет после триллиона?",
        options: [
            { option: "Миллиард" },
            { option: "Квадриллион" },
            { option: "Квинтиллион" },
            { option: "Гугол" },
        ],
        answer: [1],
    },
    {
        question: "Что изобрели и испытали братья Райт?",
        options: [
            { option: "Компьютер" },
            { option: "Автомобиль" },
            { option: "Телефон" },
            { option: "Самолет" },
        ],
        answer: [3],
    },
    {
        question: "Где берут начало Олимпийские игры?",
        options: [
            { option: "В древней Греций" },
            { option: "В древнем Риме" },
            { option: "На территории Средневекевой Англий" },
            { option: "В Австралии" },
        ],
        answer: [0],
    },
    {
        question: "В какой стране находится самое большое колесо обозрения?",
        options: [
            { option: "Англия" },
            { option: "Китай" },
            { option: "США" },
            { option: "ОАЭ" },
        ],
        answer: [2],
    },
    {
        question: "Для чего были построены пирамиды?",
        options: [
            { option: "Они выполняли функций гробниц" },
            { option: "Они являлись дворцами фараонов" },
            { option: "Они представляли собой оборонительные пункты" },
            { option: "Пирамиды были гостиницами" },
        ],
        answer: [0],
    },
    {
        question: "Как называется самое глубокое место в мире?",
        options: [
            { option: "Долина Смерти" },
            { option: "Марианская впадина" },
            { option: "Кратерное озеро" },
            { option: "Пещера Д.Веревкина" },
        ],
        answer: [1],
    },
    {
        question: "Какая гора имеет самую большую высоту над уровнем моря?",
        options: [
            { option: "Эверест" },
            { option: "Гора Чимборасо" },
            { option: "Мауна-Кеа" },
            { option: "Бурдж-Халифа" },
        ],
        answer: [0],
    },
    {
        question: "Какой водоем самый большой на Земле?",
        options: [
            { option: "Атлантический океан" },
            { option: "Индийский океан" },
            { option: "Тихий океан" },
            { option: "Каспийское море" },
        ],
        answer: [2],
    },
    {
        question: "Где самая быстрая мышца в теле?",
        options: [
            { option: "Ноги" },
            { option: "Руки" },
            { option: "Пальцы" },
            { option: "Глаза" },
        ],
        answer: [3],
    },
    {
        question: "Сколько костей в теле взрослого человека?",
        options: [
            { option: "501" },
            { option: "105" },
            { option: "206" },
            { option: "347" },
        ],
        answer: [2],
    },
    {
        question: "Какое самое твердое вещество в теле человека?",
        options: [
            { option: "Кости" },
            { option: "Волосы" },
            { option: "Ногти" },
            { option: "Зубы" },
        ],
        answer: [3],
    },
    {
        question: "В чем разница между ураганом и тайфуном?",
        options: [
            { option: "Тайфуны сильнее ураганов" },
            { option: "Ни в чем, за исключением места, где они случаются" },
            { option: "Тайфуны случаются над сушей, ураганы - над водой" },
            { option: "Ураганы движутся медленее" },
        ],
        answer: [1],
    },
    {
        question: "В каком направлении восходит солнце?",
        options: [
            { option: "Север" },
            { option: "Юг" },
            { option: "Восток" },
            { option: "Запад" },
        ],
        answer: [2],
    },
    {
        question: "Когда состоялся первый в мире полет человека в космос?",
        options: [
            { option: "1973" },
            { option: "1956" },
            { option: "1965" },
            { option: "1961" },
        ],
        answer: [3],
    },
    {
        question: "Чем утконос отличается от других млекопитающих?",
        options: [
            { option: "Крякает, как утка" },
            { option: "Откладывает яйца" },
            { option: "Строит гнезда" },
            { option: "Ковылает" },
        ],
        answer: [1],
    },
    {
        question: "На какой планете самый короткий день?",
        options: [
            { option: "Меркурий" },
            { option: "Земля" },
            { option: "Нептун" },
            { option: "Юпитер" },
        ],
        answer: [3],
    },
    {
        question: "Какая звезда ближе всего к Земле?",
        options: [
            { option: "Полярная звезда" },
            { option: "Сириус" },
            { option: "Солнце" },
            { option: "Андромеда" },
        ],
        answer: [2],
    },
    {
        question:
            "Как называется метеорит который упал на Землю 15 февраля 2013 года?",
        options: [
            { option: "Тунгусский" },
            { option: "Челябинский" },
            { option: "Гоба" },
            { option: "Альенде" },
        ],
        answer: [1],
    },
    {
        question: "Какие деревья растут из желудей?",
        options: [
            { option: "Дуб" },
            { option: "Клен" },
            { option: "Гикори" },
            { option: "Грецкий орех" },
        ],
        answer: [0],
    },
    {
        question: "Сколько цветов в радуге?",
        options: [
            { option: "7" },
            { option: "10" },
            { option: "6" },
            { option: "8" },
        ],
        answer: [0],
    },
    {
        question: "Где находилась Империя ацтеков?",
        options: [
            { option: "В Южной Америке" },
            { option: "В Африке" },
            { option: "На территории современной Мексики" },
            { option: "В Северной Америке" },
        ],
        answer: [2],
    },
    {
        question: "Что самый влиятельный символ в Китайской культуре?",
        options: [
            { option: "Обезьяна" },
            { option: "Дракон" },
            { option: "Крыса" },
            { option: "Собака" },
        ],
        answer: [1],
    },
];

// Now we are sorting main array
mainAz.sort(() => Math.random() - 0.4);
mainEn.sort(() => Math.random() - 0.4);
mainRu.sort(() => Math.random() - 0.4);

// Function that starts the game
const startGame = () => {
    // Setting text to current question
    switch (localStorage.getItem("selected")) {
        case "Azərbaycanca":
            gameArray = mainAz;
            break;
        case "English":
            gameArray = mainEn;
            break;
        case "Русский":
            gameArray = mainRu;
            break;
        default:
            window.addEventListener("load", () => {
                body.classList = "start";
                nav.style.display = "none";
                main.style.display = "none";
                const container = document.createElement("div");
                container.className = "container-language";
                const h3 = document.createElement("h3");
                h3.innerText = "Select a language to continue.";
                const languageMenu = document.createElement("div");
                languageMenu.classList.toggle("language-menu");
                const Azərbaycanca = document.createElement("li");
                Azərbaycanca.innerText = "Azərbaycanca";
                Azərbaycanca.onclick = () => {
                    nav.removeAttribute("style");
                    main.removeAttribute("style");
                    body.removeAttribute("class");
                    h3.remove();
                    container.remove();
                    h3.remove();
                    selected = "Azərbaycanca";
                    localStorage.setItem("selected", selected);
                    window.location.reload();
                };
                const English = document.createElement("li");
                English.innerText = "English";
                English.onclick = () => {
                    nav.removeAttribute("style");
                    main.removeAttribute("style");
                    body.removeAttribute("class");
                    h3.remove();
                    container.remove();
                    h3.remove();
                    selected = "English";
                    localStorage.setItem("selected", selected);
                    window.location.reload();
                };
                const Русский = document.createElement("li");
                Русский.innerText = "Русский";
                Русский.onclick = () => {
                    nav.removeAttribute("style");
                    main.removeAttribute("style");
                    body.removeAttribute("class");
                    h3.remove();
                    container.remove();
                    h3.remove();
                    selected = "Русский";
                    localStorage.setItem("selected", selected);
                    window.location.reload();
                };
                body.append(container);
                container.append(h3, languageMenu);
                languageMenu.append(Azərbaycanca, English, Русский);
                console.clear();
            });
    }
    questionText.innerText = gameArray[i].question;
    // Looping for getting answers of current question
    for (let j = 0; j < gameArray[i].options.length; j++) {
        const button = document.createElement("button");
        button.innerText = gameArray[i].options[j].option;
        button.id = "answer";
        button.onclick = (e) => checkAnswers(e);
        answers.append(button);
    }
    // Showing how many correct answer did user choose
    answerCount.innerHTML = `<i>${
        correctAnswerCount + " / " + gameArray.length
    }</i>`;
};

// Start the game when loading finished
document.addEventListener("load", startGame());

// Clearing screen when answer is chosen
clear = () => {
    choosed = 0;
    while (answers.firstChild) answers.removeChild(answers.firstChild);
    (questionText.innerText = ""), i == 35 ? gameOver() : i++, (num = 20);
    startGame();
};

// Checking the answer
const checkAnswers = (e) => {
    choosed++;
    if (choosed < 2) {
        let id = gameArray[i].answer;
        if (e.target.innerText == gameArray[i].options[id].option) {
            countInterval = 1;
            correctAnswerCount++;
            e.target.classList.add("true_answer");
            if (!mute) {
                correct.play();
            }
            setTimeout(() => {
                clear();
            }, 2000);
            answerCount.innerHTML = `<i>${correctAnswerCount} / ${gameArray.length}</i>`;
        } else {
            countInterval = 1;
            e.target.classList.add("wrong_answer");
            if (!mute) {
                incorrect.play();
            }
            setTimeout(() => {
                clear();
            }, 2000);
        }
    }
};

// Creating game over screen
const gameOver = () => {
    document.body.innerHTML = `<div class="gameOver"><i style="font-size: 14px;">${correctAnswerCount} / ${gameArray.length}</i></div>`;
};

// Checking our countdown interval
if (countInterval == -1) {
    countInterval = setInterval(() => {
        countdown.innerText = num;
        num == 0 ? clear() : num--;
    }, 1000);
}

soundButton.onclick = () => {
    mute = !mute;
    if (!mute) {
        soundButton.classList.remove("mute");
        soundButton.classList.add("sound-full");
    } else {
        soundButton.classList.remove("sound-full");
        soundButton.classList.add("mute");
    }
};
