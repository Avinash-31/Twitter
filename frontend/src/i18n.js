import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n.use(LanguageDetector).use(initReactI18next).init({
    debug: true,
    lng: "en",
    returnObjects: true,
    resources: {
        en: {
            translation: {
                greeting: "Hello, Welcome!",
                whatsHappening: "What's happening!",
                searchTwitter: "Search Twitter",
                sidebarHome: "Home",
                sidebarExplore: "Explore",
                sidebarNotifications: "Notifications",
                sidebarMessages: "Messages",
                sidebarBookmarks: "Bookmarks",
                sidebarLists: "Lists",
                sidebarProfile: "Profile",
                sidebarMore: "More",
                sidebarTweet: "Tweet",
                explore: {
                    welcome: "Welcome to Explore",
                },
                notifications: {
                    welcome: "Welcome to Notifications"
                },
                messages: {
                    welcome: "Welcome to Messages"
                },
                bookmarks: {
                    welcome: "Welcome to Bookmarks"
                },
                lists: {
                    welcome: "Welcome to Lists"
                },
                more: {
                    welcome: "Welcome to More"
                },
                profile: {
                    welcome: "Welcome to Profile"
                },
                mainPage: {
                    tweets: "Tweets"
                },
                editProfile: {
                    edit: "Edit",
                    editDOB: "Edit date of birth?",
                    line1: "This can only be changed a few times.",
                    line2: "make sure you enter the age of the",
                    line3: "person using account",
                    cancel: "Cancel",
                },
                editPorfileModal: {
                    editProfile: "Edit Profile",
                    save: "Save",
                    pname: "Name : ",
                    pbio: "Bio : ",
                    plocation: "Location : ",
                    pwebsite: "Website : ",
                    birthDate: "Birth Date",
                    addDob: "Add your date of birth",
                    switchTo: "Switch to Professional"
                },
                tweetBox: {
                    subsToPost: "Subscribe to post more",
                    subscribe: "Subscribe",
                    whatsHappening: "What's happening?",
                    subsStatus: "Subscription Status : ",
                    subsExpire: " Subscription expires on ",
                    subsNot: "Not subscribed ;  Posts left : ",
                    limitReached: "You have reached your post limit. Please subscribe to post more",
                    tweet: "Tweet",
                },
                paymentModal: {
                    chooseText: "Choose the plan that fits for your team",
                    noCredit: "No credit card required",
                    basic: "Basic(Current)",
                    free: "Free",
                    free1: "10 posts",
                    free2: "10MB Space for image ",
                    free3: " or video uploads",
                    free4: "No priority support",
                    pop: "Most Popular",
                    yearly: "Yearly",
                    rsy: "Rs 499/year",
                    y1: "Unlimited Posts",
                    y2: "Unlimited space",
                    y3: "Priority Support",
                    buy: "Buy Now",
                    monthly: "Monthly",
                    mp: "Rs 199/month",
                    limitExceed: "You have exceeded your Post limit!,",
                },
                otpModal: {
                    enterotp: "Enter OTP to proceed",
                    l1: "We have sent otp to your mail ",
                    verify: "Verify OTP",
                }
            },
        },
        hi: {
            translation: {
                greeting: "नमस्ते, स्वागत है!",
                whatsHappening: "क्या हो रहा है",
                searchTwitter: "ट्विटर खोजें",
                sidebarHome: "होम",
                sidebarExplore: "अन्वेषण",
                sidebarNotifications: "सूचनाएं",
                sidebarMessages: "संदेश",
                sidebarBookmarks: "बुकमार्क",
                sidebarLists: "सूची",
                sidebarProfile: "प्रोफाइल",
                sidebarMore: "अधिक",
                sidebarTweet: "ट्वीट",
                explore: {
                    welcome: "अन्वेषण में आपका स्वागत है",
                },
                notifications: {
                    welcome: "सूचनाओं में आपका स्वागत है"
                },
                messages: {
                    welcome: "संदेशों में आपका स्वागत है"
                },
                bookmarks: {
                    welcome: "बुकमार्क में आपका स्वागत है"
                },
                lists: {
                    welcome: "सूची में आपका स्वागत है"
                },
                more: {
                    welcome: "अधिक में आपका स्वागत है"
                },
                profile: {
                    welcome: "प्रोफ़ाइल में आपका स्वागत है"
                },
                mainPage: {
                    tweets: "ट्वीट्स"
                },
                editProfile: {
                    edit: "संपादित करें",
                    editDOB: "जन्म तिथि संपादित करें?",
                    line1: "यह कुछ बार बदला जा सकता है।",
                    line2: "सुनिश्चित करें कि आप उम्र दर्ज करें",
                    line3: "खाता उपयोग करने वाले व्यक्ति की",
                    cancel: "रद्द करें",
                },
                editPorfileModal: {
                    editProfile: "प्रोफ़ाइल संपादित करें",
                    save: "सहेजें",
                    pname: "नाम : ",
                    pbio: "बायो : ",
                    plocation: "स्थान : ",
                    pwebsite: "वेबसाइट : ",
                    birthDate: "जन्म तिथि",
                    addDob: "अपनी जन्म तिथि डालें",
                    switchTo: "पेशेवर पर स्विच करें"
                },
                tweetBox: {
                    subsToPost: "अधिक पोस्ट करने के लिए सब्सक्राइब करें",
                    subscribe: "सब्सक्राइब करें",
                    whatsHappening: "क्या हो रहा है?",
                    subsStatus: "सब्सक्रिप्शन स्थिति : ",
                    subsExpire: " सब्सक्रिप्शन समाप्त होता है ",
                    subsNot: "सब्सक्राइब नहीं किया गया; पोस्ट बचे हैं : ",
                    limitReached: "आपने अपनी पोस्ट सीमा तक पहुंच लिया है। अधिक पोस्ट करने के लिए सब्सक्राइब करें",
                    tweet: "ट्वीट"
                },
                paymentModal: {
                    chooseText: "अपनी टीम के लिए उपयुक्त योजना चुनें",
                    noCredit: "कोई क्रेडिट कार्ड की आवश्यकता नहीं है",
                    basic: "बेसिक(वर्तमान)",
                    free: "मुफ्त",
                    free1: "10 पोस्ट",
                    free2: "10MB छवि के लिए स्थान ",
                    free3: " या वीडियो अपलोड",
                    free4: "कोई प्राथमिकता समर्थन नहीं",
                    pop: "सबसे लोकप्रिय",
                    yearly: "सालाना",
                    rsy: "Rs 499/साल",
                    y1: "असीमित पोस्ट",
                    y2: "असीमित स्थान",
                    y3: "प्राथमिकता समर्थन",
                    buy: "अभी खरीदें",
                    monthly: "मासिक",
                    mp: "Rs 199/महीना",
                    limitExceed: "आपने अपनी पोस्ट सीमा पार कर ली है!,"
                },
                otpModal: {
                    enterotp: "आगे बढ़ने के लिए OTP दर्ज करें",
                    l1: "हमने आपके मेल पर otp भेजा है ",
                    verify: "OTP सत्यापित करें",
                }
            },
        },
        fr: {
            translation: {
                greeting: "Bonjour, Bienvenue!",
                whatsHappening: "Quoi de neuf",
                searchTwitter: "Rechercher sur Twitter",
                sidebarHome: "Accueil",
                sidebarExplore: "Explorer",
                sidebarNotifications: "Notifications",
                sidebarMessages: "Messages",
                sidebarBookmarks: "Signets",
                sidebarLists: "Listes",
                sidebarProfile: "Profil",
                sidebarMore: "Plus",
                sidebarTweet: "Tweeter",
                explore: {
                    welcome: "Bienvenue dans Explorer",
                },
                notifications: {
                    welcome: "Bienvenue dans Notifications"
                },
                messages: {
                    welcome: "Bienvenue dans Messages"
                },
                bookmarks: {
                    welcome: "Bienvenue dans Signets"
                },
                lists: {
                    welcome: "Bienvenue dans Listes"
                },
                more: {
                    welcome: "Bienvenue dans Plus"
                },
                profile: {
                    welcome: "Bienvenue dans Profil"
                },
                mainPage: {
                    tweets: "Tweets"
                },
                editProfile: {
                    edit: "Modifier",
                    editDOB: "Modifier la date de naissance?",
                    line1: "Cela ne peut être changé que quelques fois.",
                    line2: "Assurez-vous de saisir l'âge de",
                    line3: "la personne utilisant le compte",
                    cancel: "Annuler",
                },
                editPorfileModal: {
                    editProfile: "Modifier le profil",
                    save: "Enregistrer",
                    pname: "Nom : ",
                    pbio: "Bio : ",
                    plocation: "Localisation : ",
                    pwebsite: "Site Web : ",
                    birthDate: "Date de naissance",
                    addDob: "Ajoutez votre date de naissance",
                    switchTo: "Passer au professionnel"
                },
                tweetBox: {
                    subsToPost: "Abonnez-vous pour poster plus",
                    subscribe: "Souscrire",
                    whatsHappening: "Quoi de neuf?",
                    subsStatus: "Statut de l'abonnement : ",
                    subsExpire: " L'abonnement expire le ",
                    subsNot: "Non abonné ;  Messages restants : ",
                    limitReached: "Vous avez atteint votre limite de publication. Veuillez vous abonner pour publier plus",
                    tweet: "Tweeter",
                },
                paymentModal: {
                    chooseText: "Choisissez le plan qui convient à votre équipe",
                    noCredit: "Aucune carte de crédit requise",
                    basic: "De base(Actuel)",
                    free: "Gratuit",
                    free1: "10 messages",
                    free2: "10 Mo d'espace pour les images ",
                    free3: " ou les téléchargements vidéo",
                    free4: "Pas de support prioritaire",
                    pop: "Le plus populaire",
                    yearly: "Annuel",
                    rsy: "Rs 499/an",
                    y1: "Messages illimités",
                    y2: "Espace illimité",
                    y3: "Support prioritaire",
                    buy: "Acheter maintenant",
                    monthly: "Mensuel",
                    mp: "Rs 199/mois",
                    limitExceed: "Vous avez dépassé votre limite de publication!,",
                },
                otpModal: {
                    enterotp: "Entrez l'OTP pour continuer",
                    l1: "Nous avons envoyé un otp à votre mail ",
                    verify: "Vérifier l'OTP",
                }
            },
        },
        es: {
            translation: {
                greeting: "Hola, Bienvenido!",
                whatsHappening: "Qué está pasando",
                searchTwitter: "Buscar en Twitter",
                sidebarHome: "Inicio",
                sidebarExplore: "Explorar",
                sidebarNotifications: "Notificaciones",
                sidebarMessages: "Mensajes",
                sidebarBookmarks: "Marcadores",
                sidebarLists: "Listas",
                sidebarProfile: "Perfil",
                sidebarMore: "Más",
                sidebarTweet: "Tweet",
                explore: {
                    welcome: "Bienvenido a Explorar",
                },
                notifications: {
                    welcome: "Bienvenido a Notificaciones"
                },
                messages: {
                    welcome: "Bienvenido a Mensajes"
                },
                bookmarks: {
                    welcome: "Bienvenido a Marcadores"
                },
                lists: {
                    welcome: "Bienvenido a Listas"
                },
                more: {
                    welcome: "Bienvenido a Más"
                },
                profile: {
                    welcome: "Bienvenido a Perfil"
                },
                mainPage: {
                    tweets: "Tweets"
                },
                editProfile: {
                    edit: "Editar",
                    editDOB: "¿Editar fecha de nacimiento?",
                    line1: "Esto solo se puede cambiar algunas veces.",
                    line2: "asegúrese de ingresar la edad de la",
                    line3: "persona que usa la cuenta",
                    cancel: "Cancelar",
                },
                editPorfileModal: {
                    editProfile: "Editar perfil",
                    save: "Guardar",
                    pname: "Nombre : ",
                    pbio: "Bio : ",
                    plocation: "Ubicación : ",
                    pwebsite: "Sitio web : ",
                    birthDate: "Fecha de nacimiento",
                    addDob: "Agrega tu fecha de nacimiento",
                    switchTo: "Cambiar a profesional"
                },
                tweetBox: {
                    subsToPost: "Suscríbete para publicar más",
                    subscribe: "Suscribir",
                    whatsHappening: "Qué está pasando?",
                    subsStatus: "Estado de la suscripción : ",
                    subsExpire: " La suscripción expira el ",
                    subsNot: "No suscrito ;  Mensajes restantes : ",
                    limitReached: "Has alcanzado tu límite de publicación. Suscríbete para publicar más",
                    tweet: "Tweet",
                },
                paymentModal: {
                    chooseText: "Elige el plan que se adapte a tu equipo",
                    noCredit: "No se requiere tarjeta de crédito",
                    basic: "Básico(Actual)",
                    free: "Gratis",
                    free1: "10 publicaciones",
                    free2: "10 MB de espacio para imágenes ",
                    free3: " o subidas de video",
                    free4: "Sin soporte prioritario",
                    pop: "Más popular",
                    yearly: "Anual",
                    rsy: "Rs 499/año",
                    y1: "Publicaciones ilimitadas",
                    y2: "Espacio ilimitado",
                    y3: "Soporte prioritario",
                    buy: "Comprar ahora",
                    monthly: "Mensual",
                    mp: "Rs 199/mes",
                    limitExceed: "¡Has superado tu límite de publicación!,",
                },
                otpModal: {
                    enterotp: "Ingrese OTP para continuar",
                    l1: "Hemos enviado otp a su correo ",
                    verify: "Verificar OTP",
                }
            }
        },
        te: {
            translation: {
                greeting: "హలో, స్వాగతం!",
                whatsHappening: "ఏమి జరుగుతోంది",
                searchTwitter: "ట్విట్టర్ వెతకండి",
                sidebarHome: "హోమ్",
                sidebarExplore: "అన్వేషించండి",
                sidebarNotifications: "నోటిఫికేషన్లు",
                sidebarMessages: "సందేశాలు",
                sidebarBookmarks: "బుక్మార్క్లు",
                sidebarLists: "జాబితాలు",
                sidebarProfile: "ప్రొఫైల్",
                sidebarMore: "మరిన్ని",
                sidebarTweet: "ట్వీట్",
                explore: {
                    welcome: "అన్వేషించడంలో స్వాగతం"
                },
                notifications: {
                    welcome: "నోటిఫికేషన్లకు స్వాగతం"
                },
                messages: {
                    welcome: "సందేశాలకు స్వాగతం"
                },
                bookmarks: {
                    welcome: "బుక్మార్క్లకు స్వాగతం"
                },
                lists: {
                    welcome: "జాబితాలకు స్వాగతం"
                },
                more: {
                    welcome: "మరిన్నికి స్వాగతం"
                },
                profile: {
                    welcome: "ప్రొఫైల్కు స్వాగతం"
                },
                mainPage: {
                    tweets: "ట్వీట్లు"
                },
                editProfile: {
                    edit: "సవరించు",
                    editDOB: "పుట్టిన తేదీని సవరించాలా?",
                    line1: "ఇది కొన్ని సార్లు మాత్రమే మారుతుంది.",
                    line2: "ఖాతా ఉపయోగించే వ్యక్తి యొక్క వయస్సును నమోదు",
                    line3: "చేయండి",
                    cancel: "రద్దు"
                },
                editPorfileModal: {
                    editProfile: "ప్రొఫైల్ను సవరించండి",
                    save: "భద్రపరచండి",
                    pname: "పేరు : ",
                    pbio: "బయో : ",
                    plocation: "స్థానం : ",
                    pwebsite: "వెబ్‌సైట్ : ",
                    birthDate: "పుట్టిన తేదీ",
                    addDob: "మీ పుట్టిన తేదీని జోడించండి",
                    switchTo: "ప్రొఫెషనల్‌కు మారు"
                },
                tweetBox: {
                    subsToPost: "మరిన్ని పోస్ట్‌లకు చదవండి",
                    subscribe: "చదవండి",
                    whatsHappening: "ఏమి జరుగుతోంది?",
                    subsStatus: "చదవడం స్థితి : ",
                    subsExpire: " చదవడం ముగిసేది ",
                    subsNot: "చదవడం లేదు;  మెసేజీలు మిగిచిపోయాయి : ",
                    limitReached: "మీ పోస్ట్ పరిమితిని చేరుకుంటే. మరిన్ని పోస్ట్ చేయడానికి చదవండి",
                    tweet: "ట్వీట్"
                },
                paymentModal: {
                    chooseText: "మీ టీమ్ కోసం ఉపయోగించే ప్లాన్‌ను ఎంచుకోండి",
                    noCredit: "క్రెడిట్ కార్డు అవసరం లేదు",
                    basic: "బేసిక్(ప్రస్తుతం)",
                    free: "ఉచితం",
                    free1: "10 పోస్ట్‌లు",
                    free2: "10MB ఛాయా కోసం స్థానం ",
                    free3: " లేదా వీడియో అప్‌లోడ్‌లకు",
                    free4: "ప్రాధాన్య మద్దతు లేదు",
                    pop: "అత్యంత జనప్రియమైన",
                    yearly: "సంవత్సరం",
                    rsy: "Rs 499/సంవత్సరం",
                    y1: "అసంఖ్యము పోస్ట్‌లు",
                    y2: "అసంఖ్యము స్థానం",
                    y3: "ప్రాధాన్య మద్దతు",
                    buy: "ఇప్పుడు కొనుగోలు",
                    monthly: "నెలవారీ",
                    mp: "Rs 199/నెల",
                    limitExceed: "మీ పోస్ట్ పరిమితిని అతిక్రమించారు!,"
                },
                otpModal: {
                    enterotp: "కొనసాగడానికి OTP నమోదు చేయండి",
                    l1: "మీ మెయిల్‌కి otp పంపాం ",
                    verify: "OTP నమోదు చేయండి",
                }
            }
        },
        ar: {
            translation: {
                greeting: "مرحبًا ، مرحبًا!",
                whatsHappening: "ما الجديد",
                searchTwitter: "ابحث في تويتر",
                sidebarHome: "الصفحة الرئيسية",
                sidebarExplore: "استكشاف",
                sidebarNotifications: "الإشعارات",
                sidebarMessages: "الرسائل",
                sidebarBookmarks: "المرجعية",
                sidebarLists: "القوائم",
                sidebarProfile: "الملف الشخصي",
                sidebarMore: "المزيد",
                sidebarTweet: "تغريد",
                explore: {
                    welcome: "مرحبًا بك في استكشاف"
                },
                notifications: {
                    welcome: "مرحبًا بك في الإشعارات"
                },
                messages: {
                    welcome: "مرحبًا بك في الرسائل"
                },
                bookmarks: {
                    welcome: "مرحبًا بك في المرجعية"
                },
                lists: {
                    welcome: "مرحبًا بك في القوائم"
                },
                more: {
                    welcome: "مرحبًا بك في المزيد"
                },
                profile: {
                    welcome: "مرحبًا بك في الملف الشخصي"
                },
                mainPage: {
                    tweets: "تغريدات"
                },
                editProfile: {
                    edit: "تعديل",
                    editDOB: "تحرير تاريخ الميلاد؟",
                    line1: "يمكن تغيير هذا فقط عدة مرات.",
                    line2: "تأكد من إدخال عمر",
                    line3: "الشخص الذي يستخدم الحساب",
                    cancel: "إلغاء",
                },
                editPorfileModal: {
                    editProfile: "تحرير الملف الشخصي",
                    save: "حفظ",
                    pname: "اسم : ",
                    pbio: "نبذة : ",
                    plocation: "الموقع : ",
                    pwebsite: "موقع الكتروني : ",
                    birthDate: "تاريخ الميلاد",
                    addDob: "أضف تاريخ ميلادك",
                    switchTo: "التبديل إلى المحترف"
                },
                tweetBox: {
                    subsToPost: "اشترك لنشر المزيد",
                    subscribe: "اشتراك",
                    whatsHappening: "ما الجديد؟",
                    subsStatus: "حالة الاشتراك : ",
                    subsExpire: " انتهاء الاشتراك في ",
                    subsNot: "غير مشترك ;  الرسائل المتبقية : ",
                    limitReached: "لقد وصلت إلى حد نشرك. يرجى الاشتراك لنشر المزيد",
                    tweet: "تغريد",
                },
                paymentModal: {
                    chooseText: "اختر الخطة التي تناسب فريقك",
                    noCredit: "لا يلزم بطاقة ائتمان",
                    basic: "أساسي(حالي)",
                    free: "مجاني",
                    free1: "10 منشورات",
                    free2: "10 ميجابايت مساحة للصور ",
                    free3: " أو تحميل الفيديو",
                    free4: "لا يوجد دعم أولوي",
                    pop: "الأكثر شعبية",
                    yearly: "سنوي",
                    rsy: "Rs 499/سنويًا",
                    y1: "منشورات غير محدودة",
                    y2: "مساحة غير محدودة",
                    y3: "دعم أولوي",
                    buy: "اشتر الآن",
                    monthly: "شهري",
                    mp: "Rs 199/شهريًا",
                    limitExceed: "لقد تجاوزت حد نشرك!,",
                },
                otpModal: {
                    enterotp: "أدخل OTP للمتابعة",
                    l1: "لقد أرسلنا otp إلى بريدك ",
                    verify: "تحقق من OTP",
                }
            }
        },
        pt: {
            translation: {
                greeting: "Olá, Bem-vindo!",
                whatsHappening: "O que está acontecendo",
                searchTwitter: "Pesquisar no Twitter",
                sidebarHome: "Início",
                sidebarExplore: "Explorar",
                sidebarNotifications: "Notificações",
                sidebarMessages: "Mensagens",
                sidebarBookmarks: "Favoritos",
                sidebarLists: "Listas",
                sidebarProfile: "Perfil",
                sidebarMore: "Mais",
                sidebarTweet: "Tweet",
                explore: {
                    welcome: "Bem-vindo ao Explorar"
                },
                notifications: {
                    welcome: "Bem-vindo às Notificações"
                },
                messages: {
                    welcome: "Bem-vindo às Mensagens"
                },
                bookmarks: {
                    welcome: "Bem-vindo aos Favoritos"
                },
                lists: {
                    welcome: "Bem-vindo às Listas"
                },
                more: {
                    welcome: "Bem-vindo a Mais"
                },
                profile: {
                    welcome: "Bem-vindo ao Perfil"
                },
                mainPage: {
                    tweets: "Tweets"
                },
                editProfile: {
                    edit: "Editar",
                    editDOB: "Editar data de nascimento?",
                    line1: "Isso só pode ser alterado algumas vezes.",
                    line2: "certifique-se de inserir a idade de",
                    line3: "a pessoa que usa a conta",
                    cancel: "Cancelar",
                },
                editPorfileModal: {
                    editProfile: "Editar perfil",
                    save: "Salvar",
                    pname: "Nome : ",
                    pbio: "Bio : ",
                    plocation: "Localização : ",
                    pwebsite: "Site : ",
                    birthDate: "Data de nascimento",
                    addDob: "Adicione sua data de nascimento",
                    switchTo: "Mudar para Profissional"
                },
                tweetBox: {
                    subsToPost: "Inscreva-se para postar mais",
                    subscribe: "Inscrever-se",
                    whatsHappening: "O que está acontecendo?",
                    subsStatus: "Status da assinatura : ",
                    subsExpire: " A assinatura expira em ",
                    subsNot: "Não inscrito ;  Mensagens restantes : ",
                    limitReached: "Você atingiu seu limite de postagem. Inscreva-se para postar mais",
                    tweet: "Tweet",
                },
                paymentModal: {
                    chooseText: "Escolha o plano que se adequa à sua equipe",
                    noCredit: "Não é necessário cartão de crédito",
                    basic: "Básico(Atual)",
                    free: "Grátis",
                    free1: "10 postagens",
                    free2: "10MB de espaço para imagens ",
                    free3: " ou uploads de vídeo",
                    free4: "Sem suporte prioritário",
                    pop: "Mais popular",
                    yearly: "Anual",
                    rsy: "Rs 499/ano",
                    y1: "Postagens ilimitadas",
                    y2: "Espaço ilimitado",
                    y3: "Suporte prioritário",
                    buy: "Compre agora",
                    monthly: "Mensal",
                    mp: "Rs 199/mês",
                    limitExceed: "Você excedeu seu limite de postagem!,",
                },
                otpModal: {
                    enterotp: "Digite o OTP para continuar",
                    l1: "Enviamos otp para o seu e-mail ",
                    verify: "Verificar OTP",
                }
            }
        },
        ta: {
            translation: {
                greeting: "வணக்கம், வரவேற்கின்றேன்!",
                whatsHappening: "என்ன நடக்கிறது",
                searchTwitter: "ட்விட்டரில் தேடு",
                sidebarHome: "முகப்பு",
                sidebarExplore: "ஆய்வு",
                sidebarNotifications: "அறிவிப்புகள்",
                sidebarMessages: "செய்திகள்",
                sidebarBookmarks: "புதிர்கள்",
                sidebarLists: "பட்டியல்கள்",
                sidebarProfile: "சுயவிவரம்",
                sidebarMore: "மேலும்",
                sidebarTweet: "ட்வீட்",
                explore: {
                    welcome: "ஆய்வுக்கு வரவேற்கின்றேன்"
                },
                notifications: {
                    welcome: "அறிவிப்புகளுக்கு வரவேற்கின்றேன்"
                },
                messages: {
                    welcome: "செய்திகளுக்கு வரவேற்கின்றேன்"
                },
                bookmarks: {
                    welcome: "புதிர்களுக்கு வரவேற்கின்றேன்"
                },
                lists: {
                    welcome: "பட்டியல்களுக்கு வரவேற்கின்றேன்"
                },
                more: {
                    welcome: "மேலும் வரவேற்கின்றேன்"
                },
                profile: {
                    welcome: "சுயவிவரத்திற்கு வரவேற்கின்றேன்"
                },
                mainPage: {
                    tweets: "ட்வீட்கள்"
                },
                editProfile: {
                    edit: "திருத்து",
                    editDOB: "பிறந்த தேதியை திருத்த வேண்டுமா?",
                    line1: "இது கெட்ட முறைகளில் மட்டும் மாற்றலாம்.",
                    line2: "கணவாய் பயன்படுத்தும் வயதை உள்ளிட்டு",
                    line3: "உள்ளவரின் வயதை உள்ளிட்டு உள்ளிடுக"
                },
                editPorfileModal: {
                    editProfile: "சுயவிவரத்தை திருத்து",
                    save: "சேமி",
                    pname: "பெயர் : ",
                    pbio: "பயன்பாடு : ",
                    plocation: "இருப்பிடம் : ",
                    pwebsite: "வலைத்தளம் : ",
                    birthDate: "பிறந்த தேதி",
                    addDob: "உங்கள் பிறந்த தேதியை சேர்க்க",
                    switchTo: "பேராசிரியருக்கு மாறு"
                },
                tweetBox: {
                    subsToPost: "மேலே பதிவேற்ற சந்தாக்கள்",
                    subscribe: "சந்தாக்கள்",
                    whatsHappening: "என்ன நடக்கிறது?",
                    subsStatus: "சந்தா நிலை : ",
                    subsExpire: " சந்தா காலாவதியாகும் ",
                    subsNot: "சந்தாக்கள் இல்லை ;  மெசேஜ்கள் மீதுள்ள : ",
                    limitReached: "உங்கள் பதிவு வரம்பை அடைந்துவிட்டீர்கள். மேலும் பதிவேற்ற சந்தாக்கள்",
                    tweet: "ட்வீட்"
                },
                paymentModal: {
                    chooseText: "உங்கள் குழுவிற்கு பொருந்தும் திட்டத்தைத் தேர்ந்தெடுக்கவும்",
                    noCredit: "கிரெடிட் அட்டை தேவையில்லை",
                    basic: "அடிப்படை(தற்போது)",
                    free: "இலவசம்",
                    free1: "10 பதிவுகள்",
                    free2: "10MB புகைப்பட இடத்திற்கு ",
                    free3: " அல்லது வீடியோ பதிவேற்றங்கள்",
                    free4: "முன்முதல் ஆதரவில்லை",
                    pop: "மிகவும் பிரபலமான",
                    yearly: "ஆண்டுவரை",
                    rsy: "Rs 499/ஆண்டு",
                    y1: "பதிவுகள் எதிர்வரும்",
                    y2: "இடம் எதிர்வரும்",
                    y3: "முன்னுரிமை ஆதரவு",
                    buy: "இப்போது வாங்க",
                    monthly: "மாதாந்திர",
                    mp: "Rs 199/மாதம்",
                    limitExceed: "உங்கள் பதிவு வரம்பை அதிகரித்துவிட்டீர்கள்!,"
                },
                otpModal: {
                    enterotp: "தொடர ஒடிபி உள்ளிடவும்",
                    l1: "உங்கள் மின்னஞ்சலிக்கு otp அனுப்பப்பட்டுள்ளது ",
                    verify: "OTP சரிபார்க்கவும்",
                }
            }
        },
        bn: {
            translation: {
                greeting: "হ্যালো, স্বাগতম!",
                whatsHappening: "কি হচ্ছে",
                searchTwitter: "টুইটারে অনুসন্ধান করুন",
                sidebarHome: "হোম",
                sidebarExplore: "অন্বেষণ করুন",
                sidebarNotifications: "বিজ্ঞপ্তিগুলি",
                sidebarMessages: "বার্তা",
                sidebarBookmarks: "বুকমার্ক",
                sidebarLists: "তালিকা",
                sidebarProfile: "প্রোফাইল",
                sidebarMore: "অধিক",
                sidebarTweet: "টুইট",
                explore: {
                    welcome: "অন্বেষণে স্বাগতম"
                },
                notifications: {
                    welcome: "বিজ্ঞপ্তিগুলিতে স্বাগতম"
                },
                messages: {
                    welcome: "বার্তাগুলিতে স্বাগতম"
                },
                bookmarks: {
                    welcome: "বুকমার্কগুলিতে স্বাগতম"
                },
                lists: {
                    welcome: "তালিকাগুলিতে স্বাগতম"
                },
                more: {
                    welcome: "অধিকে স্বাগতম"
                },
                profile: {
                    welcome: "প্রোফাইলে স্বাগতম"
                },
                mainPage: {
                    tweets: "টুইট"
                },
                editProfile: {
                    edit: "সম্পাদনা",
                    editDOB: "জন্ম তারিখ সম্পাদনা করবেন?",
                    line1: "এটা কিছুটা পরিবর্তন করা যেতে পারে।",
                    line2: "খাতা ব্যবহার করা ব্যক্তির বয়স প্রবেশ করান",
                    line3: "দিন"
                },
                editPorfileModal: {
                    editProfile: "প্রোফাইল সম্পাদনা করুন",
                    save: "সংরক্ষণ করুন",
                    pname: "নাম : ",
                    pbio: "বায়ো : ",
                    plocation: "অবস্থান : ",
                    pwebsite: "ওয়েবসাইট : ",
                    birthDate: "জন্ম তারিখ",
                    addDob: "আপনার জন্ম তারিখ যোগ করুন",
                    switchTo: "পেশাদারে পরিবর্তন করুন"
                },
                tweetBox: {
                    subsToPost: "আরও পোস্ট করতে সাবস্ক্রাইব করুন",
                    subscribe: "সাবস্ক্রাইব করুন",
                    whatsHappening: "কি ঘটছে?",
                    subsStatus: "সাবস্ক্রিপশনের অবস্থা : ",
                    subsExpire: " সাবস্ক্রিপশন মেয়াদ উত্তীর্ণ হয়েছে ",
                    subsNot: "সাবস্ক্রাইব না ;  বাকি মেসেজ : ",
                    limitReached: "আপনি আপনার পোস্ট সীমা পৌছে গেছেন। আরও পোস্ট করতে সাবস্ক্রাইব করুন",
                    tweet: "টুইট"
                },
                paymentModal: {
                    chooseText: "আপনার দলের জন্য যে পরিকল্পনা উপযোগী তা চয়ন করুন",
                    noCredit: "ক্রেডিট কার্ড প্রয়োজন নেই",
                    basic: "বেসিক(বর্তমান)",
                    free: "বিনামূল্যে",
                    free1: "10 পোস্ট",
                    free2: "10MB চিত্র জায়গা ",
                    free3: " বা ভিডিও আপলোড",
                    free4: "প্রাথমিক সহায়তা নেই",
                    pop: "সবচেয়ে জনপ্রিয়",
                    yearly: "বার্ষিক",
                    rsy: "Rs 499/বছর",
                    y1: "সীমাহীন পোস্ট",
                    y2: "সীমাহীন স্থান",
                    y3: "প্রাথমিক সহাযতা",
                    buy: "এখন ক্রয় করুন",
                    monthly: "মাসিক",
                    mp: "Rs 199/মাস",
                    limitExceed: "আপনি আপনার পোস্ট সীমা অতিক্রম করেছেন!,"
                },
                otpModal: {
                    enterotp: "চালিয়ে যাওয়ার জন্য OTP লিখুন",
                    l1: "আমরা আপনার ইমেলে otp প্রেরণ করেছি ",
                    verify: "OTP যাচাই করুন",


                }
            }
        },
        ur: {
            translation: {
                greeting: "ہیلو، خوش آمدید!",
                whatsHappening: "کیا ہو رہا ہے",
                searchTwitter: "ٹویٹر میں تلاش کریں",
                sidebarHome: "ہوم",
                sidebarExplore: "تلاش کریں",
                sidebarNotifications: "اطلاعات",
                sidebarMessages: "پیغامات",
                sidebarBookmarks: "بک مارکس",
                sidebarLists: "فہرستیں",
                sidebarProfile: "پروفائل",
                sidebarMore: "مزید",
                sidebarTweet: "ٹویٹ",
                explore: {
                    welcome: "تلاش میں خوش آمدید"
                },
                notifications: {
                    welcome: "اطلاعات میں خوش آمدید"
                },
                messages: {
                    welcome: "پیغامات میں خوش آمدید"
                },
                bookmarks: {
                    welcome: "بک مارکس میں خوش آمدید"
                },
                lists: {
                    welcome: "فہرستوں میں خوش آمدید"
                },
                more: {
                    welcome: "مزید میں خوش آمدید"
                },
                profile: {
                    welcome: "پروفائل میں خوش آمدید"
                },
                mainPage: {
                    tweets: "ٹویٹ"
                },
                editProfile: {
                    edit: "ترمیم",
                    editDOB: "تاریخ پیدائش میں ترمیم؟",
                    line1: "یہ صرف چند بار تبدیل کیا جا سکتا ہے۔",
                    line2: "یہ یقینی بنائیں کہ عمر درج کریں",
                    line3: "اکاؤنٹ استعمال کرنے والا شخص"
                },
                editPorfileModal: {
                    editProfile: "پروفائل میں ترمیم",
                    save: "محفوظ کریں",
                    pname: "نام : ",
                    pbio: "بائیو : ",
                    plocation: "مقام : ",
                    pwebsite: "ویب سائٹ : ",
                    birthDate: "تاریخ پیدائش",
                    addDob: "اپنی تاریخ پیدائش شامل کریں",
                    switchTo: "پیشہ ورانہ میں تبدیلی"
                },
                tweetBox: {
                    subsToPost: "مزید پوسٹ کرنے کے لئے سبسکرائب کریں",
                    subscribe: "سبسکرائب",
                    whatsHappening: "کیا ہو رہا ہے؟",
                    subsStatus: "سبسکرپشن کی حیثیت : ",
                    subsExpire: " سبسکرپشن ختم ہونے والا ہے ",
                    subsNot: "سبسکرائب نہیں ہے ;  باقی پیغامات : ",
                    limitReached: "آپ نے اپنی پوسٹ کی حد تک پہنچ گئی ہے۔ مزید پوسٹ کرنے کے لئے سبسکرائب کریں",
                    tweet: "ٹویٹ"
                },
                paymentModal: {
                    chooseText: "اپنی ٹیم کے لئے مناسب منصوبہ منتخب کریں",
                    noCredit: "کریڈٹ کارڈ کی ضرورت نہیں",
                    basic: "بنیادی(موجودہ)",
                    free: "مفت",
                    free1: "10 پوسٹ",
                    free2: "10MB تصویر کی جگہ ",
                    free3: " یا ویڈیو اپ لوڈ",
                    free4: "اولین ترتیب نہیں",
                    pop: "سب سے مقبول",
                    yearly: "سالانہ",
                    rsy: "Rs 499/سال",
                    y1: "غیر محدود پوسٹ",
                    y2: "غیر محدود جگہ",
                    y3: "اولین ترتیب",
                    buy: "اب خریدیں",
                    monthly: "ماہانہ",
                    mp: "Rs 199/مہینہ",
                    limitExceed: "آپ نے اپنی پوسٹ کی حد تجاوز کر لی ہے!,"
                },
                otpModal: {
                    enterotp: "جاری رکھنے کے لئے OTP درج کریں",
                    l1: "ہم نے آپ کے ای میل پر otp بھیجا ہے ",
                    verify: "OTP کی تصدیق کریں",
                }
            }
        }
    },
    fallbackLng: "en",
});

export default i18n;