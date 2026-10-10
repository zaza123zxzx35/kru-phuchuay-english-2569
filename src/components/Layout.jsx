import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  FileQuestion,
  NotebookPen,
  PlayCircle,
  BookOpen,
  BarChart3,
  Sun,
  Moon
} from 'lucide-react'
import { useThemeCtx } from '../context/ThemeContext'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'ภาพรวม', key: 'dashboard' },
  { to: '/timetable', icon: CalendarDays, label: 'ตารางติวรายวัน', key: 'timetable', badge: 'NEW' },
  { to: '/info', icon: BarChart3, label: 'สถิติ + โอกาสสมัคร', key: 'info' },
  { to: '/plan', icon: CalendarCheck, label: 'แผนการอ่าน + Mock', key: 'plan' },
  { to: '/quiz', icon: FileQuestion, label: 'ทำข้อสอบทบทวน', key: 'quiz' },
  { to: '/notes', icon: NotebookPen, label: 'โน้ตสรุป', key: 'notes' },
  { to: '/videos', icon: PlayCircle, label: 'วีดีโอติว + ไลฟ์', key: 'videos' },
]

export default function Layout({ children }) {
  const location = useLocation()
  const { theme, toggleTheme } = useThemeCtx()

  const daysToExam = Math.ceil(
    (new Date('2026-11-14T09:00:00') - new Date()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 min-h-screen flex flex-col sticky top-0 h-screen transition-colors duration-300">
        <div className="p-5 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-800 dark:text-slate-100 leading-tight">สอบครูผู้ช่วย</div>
              <div className="text-xs text-gray-500 dark:text-slate-400">สพฐ. รอบทั่วไป 2569</div>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="mx-4 mt-4 p-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl text-white">
          <div className="text-xs text-primary-100 mb-1">เหลือเวลาสอบภาค ก</div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{daysToExam}</span>
            <span className="text-sm">วัน</span>
          </div>
          <div className="text-xs text-primary-100 mt-1">14 พฤศจิกายน 2569</div>
        </div>

        {/* Nav Menu */}
        <nav className="flex-1 p-3 space-y-1 mt-2">
          {navItems.map(item => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-slate-800">
          <div className="text-xs text-gray-500 dark:text-slate-400">วิชาเอก: ภาษาอังกฤษ</div>
          <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">เป้าหมาย: บรรจุปีนี้!</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top Bar */}
        <header className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 px-8 py-4 sticky top-0 z-10 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
                {navItems.find(n => n.to === location.pathname)?.label || 'ภาพรวม'}
              </h1>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                {new Date().toLocaleDateString('th-TH', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="badge bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                เปิดสมัคร 19-25 ต.ค.
              </span>
              <button
                onClick={toggleTheme}
                title={theme === 'dark' ? 'สลับเป็น Light Mode' : 'สลับเป็น Dark Mode'}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors border border-gray-200 dark:border-slate-700"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
