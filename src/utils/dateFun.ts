
export const convertDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const hours12 = hours % 12 || 12; 
    const period = hours < 12 ? "AM" : "PM"; 

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${year}-${formattedMonth}-${formattedDay} / ${hours12}:${formattedMinutes} ${period}`;
};





export const getTimeSincePost = (createdAt: string, i18n?: any): string => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInMs = now.getTime() - postDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
  
    const validLanguages = ["ar", "en"] as const;
    const language = validLanguages.includes(i18n?.language) ? i18n.language : "en";
  
    const translations = {
      en: {
        year: "year",
        years: "years",
        month: "month",
        months: "months",
        day: "day",
        days: "days",
        hour: "hour",
        hours: "hours",
        minute: "minute",
        minutes: "minutes",
        justNow: "just now",
      },
      ar: {
        year: "سنة",
        years: "سنوات",
        month: "شهر",
        months: "أشهر",
        day: "يوم",
        days: "أيام",
        hour: "ساعة",
        hours: "ساعات",
        minute: "دقيقة",
        minutes: "دقائق",
        justNow: "الآن",
      },
    };
  
    const t = translations[language as "ar" | "en"];
  
    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? t.year : t.years}${language === "ar" ? " مضت" : " ago"}`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? t.month : t.months}${language === "ar" ? " مضت" : " ago"}`;
    } else if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? t.day : t.days}${language === "ar" ? " مضت" : " ago"}`;
    } else if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? t.hour : t.hours}${language === "ar" ? " مضت" : " ago"}`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? t.minute : t.minutes}${language === "ar" ? " مضت" : " ago"}`;
    } else {
      return t.justNow;
    }
  };
  
