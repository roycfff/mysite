import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Code, Sparkles } from "lucide-react"

export default function ProjectsSection() {
  const projects = [
    {
      title: "מערכת אוטומציה עסקית מלאה",
      description: "בניית מערכת אוטומציה מקיפה לחברת סחר, כולל חיבור CRM, ניהול מלאי אוטומטי ודיווח בזמן אמת.",
      tools: ["n8n", "Make.com", "API Integration"],
      category: "Automation",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "צ'אטבוט AI לשירות לקוחות",
      description: "פיתוח צ'אטבוט מבוסס Claude AI שמטפל ב-80% מפניות הלקוחות באופן אוטומטי ומעביר רק מקרים מורכבים לנציגים.",
      tools: ["Claude API", "Webhooks", "CRM Integration"],
      category: "AI Integration",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "קמפיין ויזואלי מלא ב-AI",
      description: "יצירת 100+ תמונות ייחודיות לקמפיין שיווקי באמצעות Midjourney, כולל עיצוב לוגו, באנרים ותוכן לרשתות חברתיות.",
      tools: ["Midjourney", "Prompt Engineering", "Design"],
      category: "Visual Content",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "מערכת מסחר אלגורתימית",
      description: "בניית מערכת מסחר אוטומטית מבוססת AI שמבצעת עסקאות על בסיס ניתוח נתונים בזמן אמת והתאמה לאסטרטגיית הלקוח.",
      tools: ["AI Algorithms", "Real-time Data", "Trading APIs"],
      category: "Algorithmic Trading",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/50 mx-auto">
            פרויקטים
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            פרויקטים שהכנתי
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            דוגמאות לפרויקטים מוצלחים שביצעתי עבור לקוחות
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-900/50 to-slate-900/20 border-slate-700/50 p-8 hover:border-slate-600 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <Badge
                    className={`bg-gradient-to-r ${project.color} text-white border-0`}
                  >
                    {project.category}
                  </Badge>
                  <Sparkles className="h-5 w-5 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 leading-relaxed">
                  {project.description}
                </p>

                {/* Tools */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <p className="text-sm text-white/50 font-semibold">טכנולוגיות:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-white/10 text-white/80 border-white/20"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-white/70 mb-4">
            רוצה לראות עוד פרויקטים או לדבר על הפרויקט שלך?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-all"
          >
            בואו נדבר
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

