import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Target,
  TrendingUp,
  AlertTriangle,
  CalendarDays,
  FileCheck,
  ChevronRight,
  Award,
  Clock,
  BookOpenCheck,
  BarChart3,
  Users,
  TrendingDown
} from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { initialStudyPlan, initialMockExams } from '../data/planData'
import { initialQuizzes } from '../data/quizData'
import { initialNotes } from '../data/notesData'
import { initialVideos } from '../data/videoData'
import { subjectStats } from '../data/hrmsStats'
import CompetitionWidget from '../components/CompetitionWidget'

const colorMap = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-900/50',
  red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900/50',
  green: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-900/50',
  amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-900/50',
  purple: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-900/50'
}

export default function Dashboard() {
  const [planItems] = useLocalStorage('study_plan', initialStudyPlan)
  const [mockExams] = useLocalStorage('mock_exams', initialMockExams)
  const [progress, setProgress] = useLocalStorage('plan_progress', {})
  const [quizResults, setQuizResults] = useLocalStorage('quiz_results', {})
  const [notes] = useLocalStorage('study_notes', initialNotes)
  const [videos] = useLocalStorage('study_videos', initialVideos)

  const totalTasks = useMemo(() => {
    return planItems.reduce((sum, p) => sum + (p.details?.length || 0), 0)
  }, [planItems])

  const doneTasks = useMemo(() => {
    return Object.values(progress).filter(Boolean).length
  }, [progress])

  const overallProgress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  const avgMockScore = useMemo(() => {
    const taken = mockExams.filter(m => typeof m.userScore === 'number')
    if (taken.length === 0) return null
    const total = taken.reduce((sum, m) => sum + (m.userScore / m.totalScore) * 100, 0)
    return Math.round(total / taken.length)
  }, [mockExams])

  const quizzesTaken = Object.keys(quizResults).length
  const avgQuiz = quizzesTaken > 0
    ? Math.round(
        Object.values(quizResults).reduce((s, r) => s + ((r.score / r.total) * 100), 0) / quizzesTaken
      )
    : null

  const watchedVideos = videos.filter(v => v.isWatched).length

  const weakPoints = [
    { title: 'ภาค ค ประวัติ+ผลงาน', score: 42, target: 80, status: 'danger' },
    { title: 'ภาค ก - ทักษะภาษาอังกฤษ', score: 75, target: 88, status: 'warning' },
    { title: 'วิชาเอกอังกฤษ Grammar', score: 78, target: 90, status: 'warning' },
    { title: 'ภาค ข วิชาการศึกษา', score: 92, target: 100, status: 'ok' }
  ]

  const completed = (pct) => ({
    danger: pct < 60,
    warning: pct >= 60 && pct < 80,
    ok: pct >= 80
  })

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 text-white relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute right-20 top-10 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-sm">
            <Target className="w-4 h-4" />
            เป้าหมาย: บรรจุครูผู้ช่วยปี 2569
          </div>
          <h2 className="text-3xl font-bold mt-4">สู้ๆ! เหลืออีกแค่ 39 วัน</h2>
          <p className="text-primary-100 mt-2 max-w-2xl">
            โฟกัสที่ #1 ดันภาค ก + วิชาเอกอังกฤษ แล้ว #2 รีบเตรียม Portfolio ภาค ค ก่อนเปิดสมัคร 19 ต.ค.
            จุดที่พลาดปีก่อน: ภาค ค ประวัติได้แค่ 21/50 — อย่าพลาดซ้ำ!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { label: 'เปิดสมัคร', date: '19-25 ต.ค.', icon: CalendarDays, color: 'from-amber-400 to-orange-500' },
              { label: 'สอบภาค ก', date: '14 พ.ย. 09:00', icon: FileCheck, color: 'from-rose-400 to-pink-600' },
              { label: 'สอบภาค ข', date: '15 พ.ย. 09:00', icon: BookOpenCheck, color: 'from-teal-400 to-emerald-600' },
              { label: 'สัมภาษณ์', date: 'ก่อน 30 พ.ย.', icon: Award, color: 'from-indigo-400 to-violet-600' }
            ].map(i => (
              <div key={i.label} className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${i.color} flex items-center justify-center mb-2`}>
                  <i.icon className="w-4 h-4 text-white" />
                </div>
                <div className="text-xs text-primary-100">{i.label}</div>
                <div className="font-semibold text-sm mt-0.5">{i.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HRMS Stats Widget */}
      <div className="card border-2 border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/30 dark:to-slate-900">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-slate-100">สถิติวิชาภาษาอังกฤษ (จาก HRMS.OBEC)</h3>
              <p className="text-xs text-gray-500 dark:text-slate-400">
                อัตราการเกษียณ + อัตราขาดแผ่นดินทั่วประเทศ — ใช้ตัดสินใจสมัครเขต
              </p>
            </div>
          </div>
          <Link to="/info" className="btn-secondary text-sm">
            ดูรายละเอียดทั้งหมด <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-300 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-xs text-gray-500 dark:text-slate-400">มาตรฐานอัตราทั้งประเทศ</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-slate-100">{subjectStats.nationalSummary.standardQuota.toLocaleString()}</div>
            <div className="text-[10px] text-gray-400 dark:text-slate-500">ตำแหน่งที่ควรมี</div>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <span className="text-xs text-gray-500 dark:text-slate-400">ครูที่มีตัวอยู่จริง</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 dark:text-slate-100">{subjectStats.nationalSummary.actualTeachers.toLocaleString()}</div>
            <div className="text-[10px] text-gray-400 dark:text-slate-500">ณ ปีงบ 2568</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-red-100/60 dark:from-red-950/40 dark:to-red-900/20 border border-red-200 dark:border-red-900/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-500 text-white flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
              <span className="text-xs text-red-600 dark:text-red-300 font-medium">อัตราขาดแผ่นดิน</span>
            </div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-200">{subjectStats.nationalSummary.deficit.toLocaleString()}</div>
            <div className="text-[10px] text-red-500 dark:text-red-300/80">
              ขาด {subjectStats.nationalSummary.deficitPercent}% จากมาตรฐาน
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/60 dark:from-green-950/40 dark:to-green-900/20 border border-green-200 dark:border-green-900/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-success-600 text-white flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-xs text-green-700 dark:text-green-300 font-medium">2569 (ปีนี้) เกษียณ</span>
            </div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-200">
              {(subjectStats.yearlyRetirements.find(y => y.year === 2569)?.total || 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-green-600 dark:text-green-300/80">
              สพป. {(subjectStats.yearlyRetirements.find(y => y.year === 2569)?.primary || 0).toLocaleString()}
              {' · '}
              สพม. {(subjectStats.yearlyRetirements.find(y => y.year === 2569)?.secondary || 0).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1 text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
            <strong className="text-gray-800 dark:text-slate-100">สรุปด่วน:</strong> ภาษาอังกฤษเป็น <span className="text-indigo-700 dark:text-indigo-300 font-semibold">อันดับ 5 ของความต้องการสูงสุด</span> ทั่วประเทศ
            (รวม 10 ปีข้างหน้ามีอัตราเกษียณ <strong>{subjectStats.cumulative10Year.total.toLocaleString()} อัตรา</strong>)
            — ปีนี้เป็นปีที่โอกาสดี! อย่าพลาดที่ <strong className="text-red-600 dark:text-red-300">ภาค ค ประวัติ+ผลงาน</strong> เหมือนปี 68.
            รวม <strong>12 ต.ค.</strong> จะมีประกาศเขตที่เปิดรับทุกเขต!
          </div>
        </div>
      </div>

      {/* 🌟 อัตราแข่งคนสมัคร Real-Time Widget (NEW!) */}
      <CompetitionWidget />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'ความคืบหน้าแผนการอ่าน',
            value: `${overallProgress}%`,
            sub: `${doneTasks} / ${totalTasks} งาน`,
            icon: TrendingUp,
            color: 'bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-300',
            bar: overallProgress
          },
          {
            label: 'คะแนน Mock เฉลี่ย',
            value: avgMockScore ? `${avgMockScore}%` : '-',
            sub: `${mockExams.filter(m => typeof m.userScore === 'number').length} ครั้ง`,
            icon: Award,
            color: 'bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-300',
            bar: avgMockScore || 0
          },
          {
            label: 'ทำโจทย์ Quiz',
            value: quizzesTaken ? `${avgQuiz}%` : '-',
            sub: `${quizzesTaken} ชุด`,
            icon: FileCheck,
            color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300',
            bar: avgQuiz || 0
          },
          {
            label: 'ดูวีดีโอติว',
            value: `${watchedVideos} / ${videos.length}`,
            sub: `โน้ต ${notes.length} หัวข้อ`,
            icon: Clock,
            color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/30 dark:text-purple-300',
            bar: Math.round((watchedVideos / videos.length) * 100) || 0
          }
        ].map((s, i) => (
          <div key={i} className="card">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-gray-500 dark:text-slate-400">{s.label}</div>
                <div className="text-2xl font-bold text-gray-800 dark:text-slate-100 mt-1">{s.value}</div>
                <div className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{s.sub}</div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="progress-bar mt-3">
              <div className="progress-fill" style={{ width: `${s.bar}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Trend Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mock Score Trend */}
        <div className="card">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-semibold text-gray-800 dark:text-slate-100 text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
              แนวโน้มคะแนน Mock Exam
            </h3>
            <Link to="/plan" className="text-xs text-green-600 dark:text-green-400 hover:underline font-medium inline-flex items-center gap-1">
              ไปหน้า Mock <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {(() => {
            const taken = mockExams
              .filter(m => typeof m.userScore === 'number' && m.date)
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(-8)
            if (taken.length === 0) {
              return (
                <div className="py-10 text-center text-sm text-gray-400 dark:text-slate-500 space-y-2">
                  <Award className="w-12 h-12 mx-auto text-gray-200 dark:text-slate-700" />
                  <p>ยังไม่มี Mock ที่ทำเสร็จและลงวันที่</p>
                  <p className="text-xs">ไปที่หน้าแผนการอ่าน ใส่คะแนน Mock + วันที่ แล้วจะขึ้นกราฟตรงนี้!</p>
                </div>
              )
            }
            const maxScore = Math.max(...taken.map(m => (m.userScore / m.totalScore) * 100), 90)
            return (
              <div>
                <div className="flex items-end gap-2 h-44 border-b border-gray-100 dark:border-slate-800 pb-1">
                  {taken.map(m => {
                    const pct = Math.round((m.userScore / m.totalScore) * 100)
                    const h = Math.max(8, (pct / maxScore) * 100)
                    const pass = pct >= 70
                    return (
                      <div key={m.id} className="flex-1 flex flex-col items-center justify-end gap-1 group">
                        <div className="text-[10px] font-bold text-gray-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          {pct}%
                        </div>
                        <div
                          className={`w-full rounded-t-md transition-all ${
                            pass ? 'bg-gradient-to-t from-green-500 to-green-400' : 'bg-gradient-to-t from-amber-500 to-amber-400'
                          }`}
                          style={{ height: `${h}%` }}
                          title={`${m.name} — ${pct}%`}
                        />
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-2 mt-2 text-[10px] text-gray-400 dark:text-slate-500">
                  {taken.map(m => (
                    <div key={m.id} className="flex-1 text-center truncate">
                      {new Date(m.date).toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit' })}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-slate-400 flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-500"></span> ผ่านเกณฑ์ ≥ 70%</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500"></span> ต้องดันคะแนน</span>
                </div>
              </div>
            )
          })()}
        </div>

        {/* Quiz Score Trend */}
        <div className="card">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-semibold text-gray-800 dark:text-slate-100 text-lg flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              แนวโน้มคะแนน Quiz
            </h3>
            <Link to="/quiz" className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium inline-flex items-center gap-1">
              ไปทำ Quiz <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {(() => {
            const results = Object.entries(quizResults)
              .map(([key, r]) => ({ key, ...r }))
              .filter(r => typeof r.score === 'number' && typeof r.total === 'number' && r.at)
              .sort((a, b) => new Date(a.at) - new Date(b.at))
              .slice(-8)
            if (results.length === 0) {
              return (
                <div className="py-10 text-center text-sm text-gray-400 dark:text-slate-500 space-y-2">
                  <FileCheck className="w-12 h-12 mx-auto text-gray-200 dark:text-slate-700" />
                  <p>ยังไม่มี Quiz ที่ทำเสร็จ</p>
                  <p className="text-xs">ไปที่หน้า ทำข้อสอบทบทวน ทำ Quiz 1-2 ชุด กราฟจะขึ้นที่นี่!</p>
                </div>
              )
            }
            const maxScore = Math.max(...results.map(r => (r.score / r.total) * 100), 90)
            return (
              <div>
                <div className="flex items-end gap-2 h-44 border-b border-gray-100 dark:border-slate-800 pb-1">
                  {results.map(r => {
                    const pct = Math.round((r.score / r.total) * 100)
                    const h = Math.max(8, (pct / maxScore) * 100)
                    const pass = pct >= 80
                    return (
                      <div key={r.key} className="flex-1 flex flex-col items-center justify-end gap-1 group">
                        <div className="text-[10px] font-bold text-gray-700 dark:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                          {pct}%
                        </div>
                        <div
                          className={`w-full rounded-t-md transition-all ${
                            pass ? 'bg-gradient-to-t from-primary-600 to-indigo-400' : 'bg-gradient-to-t from-rose-500 to-rose-400'
                          }`}
                          style={{ height: `${h}%` }}
                          title={`${r.title || r.key} — ${pct}%`}
                        />
                      </div>
                    )
                  })}
                </div>
                <div className="flex gap-2 mt-2 text-[10px] text-gray-400 dark:text-slate-500">
                  {results.map(r => (
                    <div key={r.key} className="flex-1 text-center truncate">
                      {new Date(r.at).toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit' })}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 text-xs text-gray-500 dark:text-slate-400 flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-primary-600"></span> Quiz ดี ≥ 80%</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-rose-500"></span> ต้องทบทวน</span>
                </div>
              </div>
            )
          })()}
        </div>
      </div>

      {/* Grid 2 Column: Priorities + Weak Points */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Plan 1-5 */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800 dark:text-slate-100 text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              ลำดับการอ่าน 1-5 (ตามความสำคัญ)
            </h3>
            <Link to="/plan" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium inline-flex items-center gap-1">
              จัดการแผน <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {planItems.map(p => {
              const done = p.details.filter(d => progress[`${p.id}_${p.details.indexOf(d)}`]).length
              const pct = Math.round((done / p.details.length) * 100)
              return (
                <div key={p.id} className={`p-4 rounded-xl border ${colorMap[p.color] || 'bg-gray-50 border-gray-200 dark:bg-slate-800 dark:border-slate-700'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-slate-900 font-bold text-sm">
                          #{p.priority}
                        </span>
                        <div className="font-semibold">{p.title}</div>
                      </div>
                      <div className="text-xs opacity-80">{p.subtitle}</div>
                      <div className="text-xs opacity-70 mt-1">เป้าหมาย: {p.targetScore}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-70">ความคืบหน้า</div>
                      <div className="font-bold text-lg">{pct}%</div>
                    </div>
                  </div>
                  <div className="progress-bar mt-2 bg-white/60 dark:bg-slate-900/40">
                    <div
                      className={`h-full rounded-full transition-all ${
                        p.color === 'blue' ? 'bg-blue-600' :
                        p.color === 'red' ? 'bg-red-600' :
                        p.color === 'green' ? 'bg-green-600' :
                        p.color === 'amber' ? 'bg-amber-500' : 'bg-purple-600'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Weak Points */}
        <div className="card">
          <h3 className="font-semibold text-gray-800 dark:text-slate-100 text-lg flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            จุดอ่อน (ตามคะแนนปี 68)
          </h3>
          <div className="space-y-4">
            {weakPoints.map(w => {
              const s = completed(w.score)
              const cls = s.danger ? 'bg-red-500' : s.warning ? 'bg-amber-500' : 'bg-green-500'
              const textCls = s.danger ? 'text-red-600 dark:text-red-300' : s.warning ? 'text-amber-600 dark:text-amber-300' : 'text-green-600 dark:text-green-300'
              return (
                <div key={w.title}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700 dark:text-slate-300">{w.title}</span>
                    <span className={`text-xs font-semibold ${textCls}`}>
                      {w.score}% / เป้า {w.target}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className={`h-full rounded-full ${cls}`} style={{ width: `${w.score}%` }} />
                  </div>
                  <div className="progress-bar bg-transparent h-1 mt-1">
                    <div className="h-full rounded-full bg-gray-200 dark:bg-slate-700" style={{ width: `${w.target}%` }} />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
            <div className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">⚠️ ระวังจุดนี้เป็นพิเศษ!</div>
            <div className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
              ปี 68 ภาค ค ประวัติ+ผลงานได้แค่ 21/50 — เป็นจุดที่ทำให้พลาดการบรรจุโดยตรง!
              รีบเตรียม Portfolio, ใบประกาศ, ผลงานต่างๆ ตั้งแต่ก่อนสมัคร 19 ต.ค.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
