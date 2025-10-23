import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MessageCircle, Calendar } from "lucide-react"

export default function ContactSection() {
  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Main CTA */}
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            הגיע הזמן להפסיק לדבר על AI
          </h2>
          <p className="text-xl text-white/70">
            ולהתחיל להטמיע אותו בעסק שלך
          </p>
          <p className="text-lg text-white/60">
            בין אם אתה רוצה אוטומציה מלאה או שדרוג נקודתי – אני כאן כדי להבטיח שההשקעה שלך ב-AI תחזיר את עצמה.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Phone Card */}
          <Card className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 border-blue-500/30 p-8 hover:border-blue-500/60 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-blue-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">שיחה טלפונית</h3>
                <p className="text-white/70 mb-4">זמין לשיחות בזמן קצר</p>
                <a
                  href="tel:0523570858"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold"
                >
                  052-3570858
                  <span>→</span>
                </a>
              </div>
            </div>
          </Card>

          {/* Email Card */}
          <Card className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 border-purple-500/30 p-8 hover:border-purple-500/60 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-purple-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">דוא"ל</h3>
                <p className="text-white/70 mb-4">שלח לי הודעה עם הפרטים שלך</p>
                <a
                  href="mailto:roydavidi2004@gmail.com"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold"
                >
                  roydavidi2004@gmail.com
                  <span>→</span>
                </a>
              </div>
            </div>
          </Card>
        </div>

        {/* Primary CTA Button */}
        <div className="text-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 text-lg h-14 px-10 rounded-lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            קבע שיחת ייעוץ ראשונית בחינם
          </Button>
          <p className="text-white/50 text-sm mt-4">
            זמן התגובה ממוצע: פחות מ-24 שעות
          </p>
        </div>

        {/* Trust Section */}
        <div className="bg-gradient-to-r from-slate-900/50 to-slate-900/20 border border-slate-700/50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-6">למה לבחור בי?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <p className="text-white/70">התמקדות בתוצאות מדידות</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">8+</div>
              <p className="text-white/70">שנות ניהול וניסיון</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">10+</div>
              <p className="text-white/70">פרויקטים מוגמרים בהצלחה</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

