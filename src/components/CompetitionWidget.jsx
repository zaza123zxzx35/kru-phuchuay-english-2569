import { useState, useMemo } from 'react'
import {
  Plus,
  Trash2,
  Save,
  BarChart3,
  Users,
  Target,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Calendar
} from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const seedRates = () => ([
  {
    id: 'seed-1',
    district: 'สพป.ตาก เขต 2',
    subject: 'ภาษาอังกฤษ',
    vacancies: 2,
    applicants: 0,
    updatedAt: '2026-10-06',
    note: '✅ แนะนำ #1 อัตราแข่งคาด 1:39 (ดีกว่าเฉลี่ย 1:97 มาก)'
  },
  {
    id: 'seed-2',
    district: 'สพป.สมุทรสาคร',
    subject: 'ภาษาอังกฤษ',
    vacancies: 0,
    applicants: 0,
    updatedAt: '2026-10-06',
    note: 'ยังไม่เปิดประกาศ 12 ต.ค. — 2567 อัตราแข่ง 1:17.5 ดีที่สุด!'
  },
  {
    id: 'seed-3',
    district: 'สพป.พิจิตร เขต 2',
    subject: 'ภาษาอังกฤษ',
    vacancies: 0,
    applicants: 0,
    updatedAt: '2026-10-06',
    note: 'ยังไม่เปิด 12 ต.ค. — ใกล้บ้านพิษณุโลก แต่ HARD RULE: ดูอัตราส่วนก่อน'
  },
  {
    id: 'seed-4',
    district: 'สพป.พิษณุโลก เขต 2',
    subject: 'ภาษาอังกฤษ',
    vacancies: 5,
    applicants: 0,
    updatedAt: '2026-10-06',
    note: '⭐ บ้านอยู่พิษณุโลก ใกล้สุด! แต่ ⚠️ HARD RULE #4: ถ้าอัตราแข่ง ≥1:60 → ห้ามยื่น! ติดบัญชีแน่นอน เหมือนสุพรรณฯ เขต1 ปี68'
  },
  {
    id: 'seed-5',
    district: 'สพป.อำนาจเจริญ',
    subject: 'ภาษาอังกฤษ',
    vacancies: 1,
    applicants: 0,
    updatedAt: '2026-10-06',
    note: '2567 บรรจุ 100% ดีมาก แต่ไกลจากบ้านพิษณุมาก (อีสานตะวันออก)'
  }
])

function ratioLevel(applicants, vacancies) {
  if (vacancies <= 0 || applicants <= 0) return { label: 'รอข้อมูล', color: 'gray', pct: 10 }
  const r = applicants / vacancies
  if (r <= 40) return { label: 'แข่งน้อย โอกาสดี ✅', color: 'emerald', pct: Math.max(10, 100 - r * 2) }
  if (r <= 60) return { label: 'ปานกลาง ⚠️', color: 'amber', pct: Math.max(30, 100 - r * 1.2) }
  return { label: 'แข่งมาก ❌ หลีกเลี่ยง', color: 'red', pct: Math.max(20, 100 - r * 0.9) }
}

export default function CompetitionWidget() {
  const [rates, setRates] = useLocalStorage('competition_rates_v1', seedRates())
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ district: '', subject: 'ภาษาอังกฤษ', vacancies: '', applicants: '', note: '' })
  const [editId, setEditId] = useState(null)
  const [sortAsc, setSortAsc] = useState(false)

  const sortedRates = useMemo(() => {
    const copy = [...rates]
    copy.sort((a, b) => {
      const ra = a.vacancies > 0 && a.applicants > 0 ? a.applicants / a.vacancies : Infinity
      const rb = b.vacancies > 0 && b.applicants > 0 ? b.applicants / b.vacancies : Infinity
      return sortAsc ? ra - rb : rb - ra
    })
    return copy
  }, [rates, sortAsc])

  const resetForm = () => { setForm({ district: '', subject: 'ภาษาอังกฤษ', vacancies: '', applicants: '', note: '' }); setEditId(null) }

  const handleAdd = () => {
    if (!form.district.trim() || form.vacancies === '') return
    const today = new Date().toISOString().slice(0, 10)
    if (editId) {
      setRates(rates.map(r => r.id === editId ? { ...r, ...form, vacancies: +form.vacancies, applicants: +form.applicants || 0, updatedAt: today } : r))
    } else {
      setRates([...rates, { id: `cr_${Date.now()}`, ...form, vacancies: +form.vacancies, applicants: +form.applicants || 0, updatedAt: today }])
    }
    resetForm()
    setShowForm(false)
  }

  const handleEdit = (r) => {
    setForm({ district: r.district, subject: r.subject, vacancies: String(r.vacancies), applicants: String(r.applicants), note: r.note })
    setEditId(r.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('ลบรายการนี้ใช่ไหม?')) setRates(rates.filter(r => r.id !== id))
  }

  const colorClasses = (c) => {
    switch (c) {
      case 'emerald': return { bar: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/30', badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' }
      case 'amber': return { bar: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/30', badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' }
      case 'red': return { bar: 'bg-red-500', text: 'text-red-700 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-950/30', badge: 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300' }
      default: return { bar: 'bg-gray-400', text: 'text-gray-600 dark:text-slate-400', bg: 'bg-gray-50 dark:bg-slate-800', badge: 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400' }
    }
  }

  const stats = useMemo(() => {
    const hasData = rates.filter(r => r.vacancies > 0 && r.applicants > 0)
    const totalVac = rates.reduce((s, r) => s + r.vacancies, 0)
    const totalApp = rates.reduce((s, r) => s + r.applicants, 0)
    const best = hasData.length > 0 ? hasData.reduce((a, b) => (a.applicants / a.vacancies) < (b.applicants / b.vacancies) ? a : b) : null
    const worst = hasData.length > 0 ? hasData.reduce((a, b) => (a.applicants / a.vacancies) > (b.applicants / b.vacancies) ? a : b) : null
    const avg = hasData.length > 0 ? hasData.reduce((s, r) => s + (r.applicants / r.vacancies), 0) / hasData.length : 0
    return { totalVac, totalApp, best, worst, avg: avg.toFixed(1), updated: new Date().toLocaleDateString('th-TH') }
  }, [rates])

  return (
    <div className="card border-2 border-indigo-100 dark:border-indigo-900/50 relative">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => setSortAsc(v => !v)}
          title={sortAsc ? 'จัดเรียง: แข่งน้อย → แข่งมาก' : 'จัดเรียง: แข่งมาก → แข่งน้อย'}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
        >
          {sortAsc ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <button
          onClick={() => { setShowForm(v => !v); resetForm() }}
          className="btn-primary !py-1.5 !px-3 !text-xs"
        >
          <Plus className="w-3.5 h-3.5" /> {showForm ? 'ยกเลิก' : 'เพิ่ม/อัพเดท'}
        </button>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 dark:text-slate-100 text-lg">📊 อัตราแข่งคนสมัคร Real-Time</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            📅 อัพเดททุกวัน ระหว่าง 19-25 ต.ค. 69 · บันทึกยอดคนสมัครต่อ 1 อัตรา → เลือกเขตที่แข่งน้อยที่สุด!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-indigo-50 dark:bg-indigo-950/30 rounded-lg p-3 border border-indigo-100 dark:border-indigo-900/50">
          <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-300 mb-1"><Target className="w-3 h-3" /> อัตราว่างทั้งหมด</div>
          <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-200">{stats.totalVac}</div>
        </div>
        <div className="bg-sky-50 dark:bg-sky-950/30 rounded-lg p-3 border border-sky-100 dark:border-sky-900/50">
          <div className="flex items-center gap-1.5 text-xs text-sky-600 dark:text-sky-300 mb-1"><Users className="w-3 h-3" /> คนสมัครสะสม</div>
          <div className="text-2xl font-bold text-sky-700 dark:text-sky-200">{stats.totalApp}</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3 border border-purple-100 dark:border-purple-900/50">
          <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-300 mb-1"><BarChart3 className="w-3 h-3" /> อัตราส่วนเฉลี่ย</div>
          <div className="text-2xl font-bold text-purple-700 dark:text-purple-200">{stats.avg === '0.0' ? '-' : `1:${stats.avg}`}</div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-lg p-3 border border-emerald-100 dark:border-emerald-900/50">
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-300 mb-1"><ThumbsUp className="w-3 h-3" /> โอกาสดีสุด</div>
          <div className="text-sm font-bold text-emerald-700 dark:text-emerald-200 truncate" title={stats.best?.district}>
            {stats.best ? `${stats.best.district.slice(0, 12)} 1:${(stats.best.applicants / stats.best.vacancies).toFixed(0)}` : '-'}
          </div>
        </div>
        <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-3 border border-red-100 dark:border-red-900/50">
          <div className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-300 mb-1"><ThumbsDown className="w-3 h-3" /> แข่งมากสุด</div>
          <div className="text-sm font-bold text-red-700 dark:text-red-200 truncate" title={stats.worst?.district}>
            {stats.worst ? `${stats.worst.district.slice(0, 12)} 1:${(stats.worst.applicants / stats.worst.vacancies).toFixed(0)}` : '-'}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="mb-6 p-4 border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 space-y-3">
          <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
            <Save className="w-4 h-4" /> {editId ? 'อัพเดทรายการ' : 'เพิ่มรายการอัตราแข่งใหม่'}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label className="label !mb-1 !text-xs">เขตสอบ *</label>
              <input className="input !py-1.5" placeholder="เช่น สพป.ตาก เขต 2"
                value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} />
            </div>
            <div>
              <label className="label !mb-1 !text-xs">วิชาเอก</label>
              <input className="input !py-1.5" value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })} />
            </div>
            <div>
              <label className="label !mb-1 !text-xs">อัตราว่าง *</label>
              <input type="number" min="0" className="input !py-1.5" placeholder="0"
                value={form.vacancies} onChange={e => setForm({ ...form, vacancies: e.target.value })} />
            </div>
            <div>
              <label className="label !mb-1 !text-xs">จำนวนคนสมัคร</label>
              <input type="number" min="0" className="input !py-1.5" placeholder="0 (ยังไม่มี)"
                value={form.applicants} onChange={e => setForm({ ...form, applicants: e.target.value })} />
            </div>
            <div>
              <label className="label !mb-1 !text-xs">บันทึกความเห็น</label>
              <input className="input !py-1.5" placeholder="หมายเหตุ/เตือนตัวเอง"
                value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleAdd} className="btn-success !text-xs !py-1.5">
              <Save className="w-3.5 h-3.5" /> {editId ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มเข้า Widget'}
            </button>
            <button onClick={() => { setShowForm(false); resetForm() }} className="btn-secondary !text-xs !py-1.5">ยกเลิก</button>
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        {sortedRates.length === 0 && (
          <div className="text-center py-10 text-gray-400 dark:text-slate-500">
            <AlertTriangle className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <div className="text-sm">ยังไม่มีข้อมูล — กดปุ่ม "เพิ่ม/อัพเดท" เพื่อเริ่มบันทึก</div>
          </div>
        )}
        {sortedRates.map((r, idx) => {
          const ratio = r.vacancies > 0 && r.applicants > 0 ? (r.applicants / r.vacancies).toFixed(1) : null
          const lvl = ratioLevel(+r.applicants, +r.vacancies)
          const cc = colorClasses(lvl.color)
          return (
            <div key={r.id} className={`rounded-xl border ${cc.bg} p-4 transition-all hover:shadow-sm`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center font-bold text-gray-700 dark:text-slate-300 text-sm">
                  #{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                    <div className="font-semibold text-gray-800 dark:text-slate-100">{r.district}</div>
                    <span className={`badge ${cc.badge} text-[10px]`}>
                      {r.subject}
                    </span>
                    <span className={`badge ${lvl.color === 'emerald' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : lvl.color === 'amber' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' : lvl.color === 'red' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400'} text-[10px] ml-auto`}>
                      {lvl.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2 text-xs mb-2">
                    <div className="flex items-center gap-1">
                      <Target className="w-3 h-3 text-rose-500" />
                      <span className="text-gray-500 dark:text-slate-400">ว่าง:</span>
                      <span className="font-semibold text-gray-800 dark:text-slate-200">{r.vacancies} อ.</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-sky-500" />
                      <span className="text-gray-500 dark:text-slate-400">สมัคร:</span>
                      <span className="font-semibold text-gray-800 dark:text-slate-200">{r.applicants} คน</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 className={`w-3 h-3 ${cc.text}`} />
                      <span className="text-gray-500 dark:text-slate-400">อัตราส่วน:</span>
                      <span className={`font-bold ${cc.text}`}>
                        {ratio ? `1:${ratio}` : 'รอข้อมูล'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                      <Calendar className="w-3 h-3 text-purple-500" />
                      <span className="text-gray-500 dark:text-slate-400">อัพเดท:</span>
                      <span className="font-medium text-gray-700 dark:text-slate-300">{r.updatedAt || '-'}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden mb-2">
                    <div className={`h-full ${cc.bar} transition-all duration-500`} style={{ width: `${lvl.pct}%` }} />
                  </div>
                  {r.note && (
                    <div className="text-xs text-gray-600 dark:text-slate-400 bg-white/60 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-slate-700">
                      💬 {r.note}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button onClick={() => handleEdit(r)} title="แก้ไข" className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 flex items-center justify-center">
                    <Save className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(r.id)} title="ลบ" className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 flex items-center justify-center">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
