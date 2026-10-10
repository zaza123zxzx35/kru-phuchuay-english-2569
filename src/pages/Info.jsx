import {
  BarChart3,
  TrendingDown,
  Users,
  Award,
  Target,
  ChevronRight,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  Brain,
  Calculator,
  Swords,
  Trophy,
  AlertTriangle,
  Clock,
  TrendingUp,
  BadgeCheck,
  Zap,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  XCircle
} from 'lucide-react'
import { subjectStats } from '../data/hrmsStats'

const fmt = (n) => n.toLocaleString('th-TH')

export default function Info() {
  const s = subjectStats
  const thisYear = s.yearlyRetirements.find(y => y.year === 2569)
  const maxTotal = Math.max(...s.yearlyRetirements.map(y => y.total))

  const W = { vacancy: 0.40, applicant: 0.30, school: 0.12, history: 0.10, distance: 0.08 }

  const districtScores = [
    {
      rank: 1,
      name: 'สพป.ตาก เขต 2',
      candidate: true,
      candidateTag: 'B',
      vacancy: 95, applicant: 80, school: 100, history: 90, distance: 90,
      vacancy_note: 'เกษียณ 18 + รับย้าย 24',
      applicant_note: 'ปี 68 อัตรา 1:39 (ดีกว่าเฉลี่ย 1:97)',
      school_note: '122 โรงเรียน · ย้ายออก TOP 10',
      history_note: 'รับย้ายเยอะ → เรียกรอบต่อถี่',
      distance_note: 'ภาคเหนือตะวันตก · ใกล้สุพรรณฯ'
    },
    {
      rank: 2,
      name: 'สพป.สมุทรสาคร',
      vacancy: 80, applicant: 90, school: 85, history: 90, distance: 85,
      vacancy_note: '2567 บรรจุ 42/45 = 93%',
      applicant_note: '2567 อัตราแข่ง 1:17.5 (ดีที่สุด!)',
      school_note: 'โรงเรียน 80-90 แห่ง · ใกล้กรุง',
      history_note: 'บรรจุต่อเนื่อง · หมดบัญชีเร็ว',
      distance_note: 'ภาคกลาง · ติดสมุทรปราการ'
    },
    {
      rank: 3,
      name: 'สพป.พิจิตร เขต 2',
      candidate: true,
      candidateTag: 'A',
      vacancy: 70, applicant: 65, school: 70, history: 60, distance: 90,
      vacancy_note: 'ยังไม่ประกาศ 12 ต.ค.69 → รอเช็ค HRMS',
      applicant_note: 'ยังไม่มีข้อมูล → สมมติ 1:50',
      school_note: 'โรงเรียนประมาณ 50 แห่ง',
      history_note: 'ไม่มีประวัติเปิดอังกฤษ 2567-68',
      distance_note: 'ใกล้สุพรรณฯ ที่สอบติด 68'
    },
    {
      rank: 4,
      name: 'สพป.พิษณุโลก เขต 2',
      vacancy: 70, applicant: 45, school: 75, history: 60, distance: 98,
      vacancy_note: 'เปิด 5 อัตรา สูงสุดใน 4 เขตที่เปิดแล้ว แต่ ⚠️ คนแห่สมัครเสมอเพราะใกล้เมืองพิษณุโลก',
      applicant_note: '⚠️⚠️ บ้านอยู่พิษณุโลก = คนสมัครล้น 100%! คาดอัตราแข่ง 1:80+ (HARD RULE #4 ห้ามเลือกถ้าเกิน 1:60!)',
      school_note: 'โรงเรียน 60-70 แห่ง',
      history_note: 'ไม่มีประวัติเปิดอังกฤษ 2567-68',
      distance_note: '⭐ บ้านอยู่พิษณุโลก · ใกล้บ้านสุด! แต่ ⚠️ HARD RULE #4: ห้ามยื่นถ้าอัตราแข่ง ≥1:60 → ติดบัญชีค้างแน่นอน'
    },
    {
      rank: 5,
      name: 'สพป.อำนาจเจริญ',
      vacancy: 60, applicant: 60, school: 55, history: 95, distance: 50,
      vacancy_note: 'เปิด 1 อัตรา · 2567 บรรจุ 100%',
      applicant_note: '2567 อัตราแข่ง 1:54',
      school_note: 'โรงเรียน 30-40 แห่ง',
      history_note: '⭐ 2567 บรรจุ 19/19 = 100%',
      distance_note: 'อีสาน · ไกลจากสุพรรณฯ'
    },
    {
      rank: 6,
      name: 'สพป.เพชรบูรณ์ เขต 3',
      vacancy: 40, applicant: 30, school: 50, history: 25, distance: 70,
      vacancy_note: 'เปิด 1 อัตรา ยังไม่เป็นทางการ',
      applicant_note: '2567 อัตราแข่ง 1:80 (แย่มาก)',
      school_note: 'โรงเรียน 30 แห่ง',
      history_note: '❌ 2567 บรรจุแค่ 18/52 = 34.6%',
      distance_note: 'ภาคกลางตะวันออก · ไม่ไกลเกินไป'
    }
  ].map(d => ({
    ...d,
    total: +(W.vacancy*d.vacancy + W.applicant*d.applicant + W.school*d.school + W.history*d.history + W.distance*d.distance).toFixed(1)
  })).sort((a,b) => b.total - a.total).map((d,i) => ({ ...d, rank: i+1 }))

  const forbidRules = [
    { icon: XCircle, title: 'ห้าม 1', text: 'ห้ามเลือกจากอัตราว่างรอบแรกสูงสุด — คนแห่สมัครล้น เช่น เชียงราย3 เปิด 6 แต่สมัคร 500+ คน ❌' },
    { icon: XCircle, title: 'ห้าม 2', text: 'ห้ามสมัครเร็วเกินไป! รอสมัครวันที่ 6-7 ของช่วง 7 วัน (24-25 ต.ค. 69) ดูยอดคนสมัครสุดท้ายก่อน' },
    { icon: XCircle, title: 'ห้าม 3', text: 'ห้ามมองแค่อัตราว่างประกาศ — ต้องดู อัตราว่างปัจจุบัน (HRMS) + อัตราเกษียณปีนี้ + รายได้ครูย้ายออก' },
    { icon: XCircle, title: 'ห้าม 4', text: 'ห้ามเลือกเขตใกล้บ้านโดยเฉพาะ! ใกล้บ้าน = คนสมัครล้น 10 เท่า. เช่น บ้านอยู่พิษณุโลก → พิษณุโลก เขต 2 ใกล้บ้านสุด แต่คาดอัตราแข่ง 1:80+ ❌. ครบ 2 ปี ทำเรื่องย้ายได้เสมอ' },
    { icon: XCircle, title: 'ห้าม 5', text: 'ห้ามไปเขตที่ อัตราว่างปัจจุบันน้อยกว่า 30 ตำแหน่ง → ผ่านแล้วกั๊กบัญชี 3 เดือน+ หรือตลอดชีพ' },
    { icon: XCircle, title: 'ห้าม 6', text: 'ห้ามคิดว่า "สอบติด = ได้บรรจุ" — 2568 อังกฤษ 6,645 คนขึ้นบัญชี แต่เรียกบรรจุแค่ 316 คน = 5% เท่านั้น!' },
    { icon: XCircle, title: 'ห้าม 7', text: 'ห้ามลืมเช็ก สถิติเรียกบรรจุย้อน 2 ปี → เขตไหน "หมดบัญชี" / "บัญชีค้าง" เป็นประจำ? ต้องรู้' }
  ]

  const scoreDimensions = [
    { icon: Target, name: 'อัตราว่างปัจจุบัน + เกษียณ + รับย้าย', weight: 40, color: 'from-red-400 to-red-600', desc: 'สำคัญที่สุด! ถ้าว่างจริงเยอะ → เรียกบรรจุรอบ 2,3,4 ต่อเนื่อง ไม่กั๊กบัญชี' },
    { icon: Users, name: 'คนสมัครวันท้าย / อัตราส่วน 1:กี่คน', weight: 30, color: 'from-orange-400 to-amber-500', desc: 'สำคัญรอง! สมัครวันสุดท้าย (24-25 ต.ค.) ดูยอดคนสมัครต่อ 1 อัตรา → น้อยที่สุด = ชนะ' },
    { icon: BarChart3, name: 'ประเภทเขต (สพป. ดีกว่า สพม.) + จำนวนโรงเรียน', weight: 12, color: 'from-blue-400 to-blue-600', desc: 'สพป. มีโรงเรียนเยอะ → เรียกบรรจุถี่กว่ามาก. สพม. แข่งสูง โรงเรียนน้อย' },
    { icon: TrendingUp, name: 'สถิติเรียกบรรจุย้อน 2567-2568', weight: 10, color: 'from-purple-400 to-purple-600', desc: 'เขตไหน บรรจุถึงลำดับที่เยอะ / "หมดบัญชี" ไว? = สัญญาณดี' },
    { icon: Clock, name: 'ระยะทาง + ความยินยอมใช้ชีวิต 2 ปี', weight: 8, color: 'from-green-400 to-emerald-600', desc: 'น้อยที่สุด! เพราะครบ 2 ปี ย้ายกลับบ้านได้เสมอ. อย่าเสียสละโอกาสบรรจุเพียงเพราะใกล้บ้าน' }
  ]

  const candidateCompare = [
    {
      title: 'สพป.พิจิตร เขต 2 (A)',
      color: 'from-sky-50 to-blue-50 border-sky-200',
      ribbon: '👤 ในใจคู่ที่ 1',
      pros: [
        'ใกล้สุพรรณบุรีมาก ที่คุณเคยสอบติดอันดับ 37',
        'สะดวกในการเดินทาง · คุ้นเคยบริเวณภาคกลาง',
        'ถ้าสอบติด และได้บรรจุ → อยู่ใกล้ครอบครัว'
      ],
      cons: [
        '⚠️ เขต 1 ของทุกจังหวัด = คนสมัครล้นเสมอ (ประสบการณ์ สุพรรณฯ เขต 1 ที่ผ่านมา!) — พิจิตร เขต 2 อาจจะค่อนข้างดี แต่คนในจังหวัดมักจะแห่สมัคร',
        'ยังไม่เปิดประกาศ → ไม่รู้ว่าเปิดอังกฤษกี่อัตรา และไม่รู้สถิติย้อนหลัง (ไม่เคยเปิด 67-68)',
        'ไม่มีข้อมูล "ครูย้ายออกเยอะ" / "เกษียณเยอะ" ในระบบยัง → รอ 12 ต.ค. 69',
        '⭐ โอกาสบรรจุจริง (Expected Value) = ต่ำกว่าตาก 2 เพราะไม่มีหลักฐานว่างจริง'
      ],
      finalVerdict: 'ติดตามข้อมูล 12 ต.ค. 69 — ถ้าเปิดอังกฤษ ≥2 อัตรา AND อัตราแข่งวันสุดท้าย ≤ 1:50 → ยังได้ แต่ถ้าเกิน → ตกเลข 1 ไปตาก 2 ทันที',
      verdictColor: 'text-sky-700 bg-sky-100'
    },
    {
      title: 'สพป.ตาก เขต 2 (B)',
      color: 'from-emerald-50 to-green-50 border-emerald-300 ring-2 ring-emerald-200',
      ribbon: '🏆 แนะนำอันดับ 1 ตอนนี้',
      pros: [
        '✅ **122 โรงเรียน** (เยอะมาก → เรียกบรรจุรอบ 2,3,4 ถี่)',
        '✅ **เกษียณปีนี้ 18 คน** + **รับย้าย 24 คน** = มีว่างจริงอีก 42 อัตรา (ไม่ได้นับเปิดสอบรอบแรก!)',
        '✅ **อยู่ Top 10 เขตที่ครูย้ายออกเยอะที่สุด** (จากหน้าวิชาอังกฤษ) → คนย้ายออกตลอดเวลา = มีว่างใหม่เรื่อยๆ = ไม่ต้องกั๊กบัญชี!',
        '✅ 2568 อัตราแข่งขัน = **1:39** (ดีกว่าค่าเฉลี่ยประเทศ 1:97 มากๆ → เกือบครึ่งหนึ่ง!)',
        '✅ ใกล้สุพรรณบุรีพอสมควร (ภูมิภาคเหนือตะวันตก ติดแม่ฮ่องสอน/กาญจนบุรี) → ไม่ไกลท่วมขัง',
        '✅ ปี 68 เปิดสอบ 1 สาขา, มีผู้สมัคร 1,473 คน (มีข้อมูลประวัติ → วิเคราะห์ได้ไม่ยาก)'
      ],
      cons: [
        '2569 ยังไม่ประกาศเปิดอังกฤษ → ต้องรอ 12 ต.ค. 69 เช็คอีกที (แต่ถ้าเปิดแค่ 1-2 อัตราก็ยังโอเค เพราะอัตราว่างปัจจุบัน+เกษียณ 42+ อัตรา!)',
        'ไกลกว่าพิจิตรเล็กน้อย → แต่ครบ 2 ปี ย้ายกลับได้เสมอ (ตามที่คุณวางแผนไว้!)'
      ],
      finalVerdict: '⭐⭐⭐ ตอนนี้ = ตัวเลือกที่ฉลาดที่สุด! ถ้า 12 ต.ค. 69 เปิดอังกฤษ ≥ 1 อัตรา AND อัตราแข่งวันสุดท้าย (24-25 ต.ค.) ≤ 1:60 → ยื่นที่นี่ทันที. โอกาสได้รับการเรียกบรรจุจริง = สูงที่สุดใน 6 เขต',
      verdictColor: 'text-emerald-800 bg-emerald-100 font-bold'
    }
  ]

  const top5Recommendations = [
    { no: 1, name: 'ตาก เขต 2', score: 90.2, reason: '⭐🏆 #1 ตลอดกาล! ว่างจริง 42+ (18 เกษียณ+24 รับย้าย) + 122 โรงเรียน + ย้ายออก TOP 10 + อัตราแข่ง 68 = 1:39 (ดีกว่าเฉลี่ยประเทศ 1:97 มาก) + ใกล้บ้านพิษณุโลกพอสมควร (ภาคเหนือตะวันตก) 2 ปีก็ย้ายกลับได้ → โอกาสบรรจุจริงสูงสุด 100%' },
    { no: 2, name: 'สมุทรสาคร', score: 85.0, reason: '2567 บรรจุ 42/45 = 93% + อัตราแข่ง 1:17.5 (ดีที่สุดในประวัติ!) + ใกล้กรุงเทพ ทำงานสะดวก → ถ้าปีนี้เปิดอังกฤษอีก ≥1 อัตรา → ต้องยื่นทันที!' },
    { no: 3, name: 'พิจิตร เขต 2', score: 69.1, reason: 'ไกลจากบ้านพิษณุโลกเล็กน้อย (ภาคเหนือล่าง) แต่ HARD RULE: ระยะทางไม่สำคัญเท่าความว่าง+คนสมัครน้อย. ยังไม่มีข้อมูล → 12 ต.ค. 69 ต้องเช็คอีกครั้ง (ถ้าเปิด ≥2 อัตรา AND อัตราแข่ง ≤1:50 → ยังได้)' },
    { no: 4, name: 'พิษณุโลก เขต 2', score: 64.3, reason: '⭐ บ้านอยู่พิษณุโลก = ใกล้บ้านสุด! เปิด 5 อัตราสูงสุดใน 4 เขตที่เปิดแล้ว → แต่ ⚠️⚠️⚠️ HARD RULE #4 เด็ดขาด: ถ้า 24 ต.ค. ดูยอดคนสมัครอัตราส่วน ≥1:60 → ห้ามยื่นเด็ดขาด! (คนแห่สมัครใกล้บ้านเสมอ → ติดบัญชีค้าง 100% เหมือนสุพรรณฯ เขต 1 ปีที่แล้ว) → ไปตาก 2 / สมุทรสาคร ดีกว่า' },
    { no: 5, name: 'อำนาจเจริญ', score: 62.1, reason: '2567 บรรจุ 19/19 = 100% ดีมาก! แต่ไกลจากบ้านพิษณุโลกเยอะมาก (อีสานตะวันออก) + ปีนี้เปิดแค่ 1 อัตรา → ถ้ายื่นต้องเตรียมย้าย 2 ปีเต็มโดยไม่คิดกลับบ้านบ่อย' }
  ]

  return (
    <div className="space-y-6">
      {/* Source + Title Banner */}
      <div className="card bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-0">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs mb-3">
              <BarChart3 className="w-4 h-4" />
              ข้อมูลจาก HRMS.OBEC (ทางการ สพฐ.)
            </div>
            <h2 className="text-2xl font-bold">สถิติวิชาภาษาอังกฤษ + โอกาสสมัครปี 2569</h2>
            <p className="text-sm text-indigo-100 mt-1 max-w-2xl">
              ข้อมูลความต้องการทดแทนอัตราครูผู้สอนที่เกษียณอายุราชการ จำแนกตามวิชาเอก ในอีก 10 ปีข้างหน้า
              (ใช้ประกอบการตัดสินใจเลือกเขตสมัครรอบทั่วไป 19-25 ต.ค. 69)
            </p>
          </div>
          <a
            href={s.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm"
          >
            <ExternalLink className="w-4 h-4" /> ดูข้อมูลต้นฉบับ
          </a>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: 'เกณฑ์มาตรฐานทั่วประเทศ',
            value: fmt(s.nationalSummary.standardQuota),
            sub: 'ตำแหน่งครูอังกฤษที่ควรมี',
            icon: Target,
            color: 'bg-blue-50 text-blue-600'
          },
          {
            label: 'ครูอังกฤษที่มีตัวอยู่จริง',
            value: fmt(s.nationalSummary.actualTeachers),
            sub: 'ณ ปีงบประมาณ 2568',
            icon: Users,
            color: 'bg-purple-50 text-purple-600'
          },
          {
            label: 'อัตราขาดแผ่นดิน',
            value: `${fmt(s.nationalSummary.deficit)} คน`,
            sub: `ขาด ${s.nationalSummary.deficitPercent}% จากมาตรฐาน`,
            icon: TrendingDown,
            color: 'bg-red-50 text-red-600',
            highlight: true
          },
          {
            label: 'ปี 2569 (ปีนี้) มีเกษียณ',
            value: `${fmt(thisYear?.total || 0)} อัตรา`,
            sub: `สพป.${fmt(thisYear?.primary || 0)} + สพม.${fmt(thisYear?.secondary || 0)}`,
            icon: Award,
            color: 'bg-success-50 text-success-600',
            highlight: true
          }
        ].map(c => (
          <div key={c.label} className={`card ${c.highlight ? 'ring-2 ring-offset-2 ring-primary-200' : ''}`}>
            <div className={`w-10 h-10 rounded-lg ${c.color} flex items-center justify-center mb-3`}>
              <c.icon className="w-5 h-5" />
            </div>
            <div className="text-xs text-gray-500 dark:text-slate-400">{c.label}</div>
            <div className="text-xl font-bold text-gray-800 dark:text-slate-200 mt-0.5">{c.value}</div>
            <div className="text-xs text-gray-400 dark:text-slate-500 mt-1">{c.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts & Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 10 Year Bar Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
            <h3 className="font-semibold text-gray-800 dark:text-slate-200 text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              แนวโน้มอัตราเกษียณวิชาภาษาอังกฤษ 10 ปี (สพป. + สพม.)
            </h3>
            <span className="text-xs text-gray-400 dark:text-slate-500">หน่วย: คนต่อปี</span>
          </div>
          <div className="space-y-3">
            {s.yearlyRetirements.map(y => {
              const pct = (y.total / maxTotal) * 100
              return (
                <div key={y.year} className="group">
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-12 font-semibold ${y.year === 2569 ? 'text-primary-600' : 'text-gray-600 dark:text-slate-400'}`}>
                        {y.year}
                      </span>
                      {y.note && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          y.year === 2569 ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400'
                        }`}>
                          {y.note}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-2">
                      <span className="text-blue-500">สพป.{fmt(y.primary)}</span>
                      <span className="text-gray-300 dark:text-slate-600">·</span>
                      <span className="text-purple-500">สพม.{fmt(y.secondary)}</span>
                      <span className="text-gray-300 dark:text-slate-600">·</span>
                      <span className={`font-bold ${y.year === 2569 ? 'text-primary-600' : 'text-gray-700 dark:text-slate-300'}`}>
                        รวม {fmt(y.total)}
                      </span>
                    </div>
                  </div>
                  <div className="h-8 flex rounded-lg overflow-hidden bg-gray-50 dark:bg-slate-900">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                      style={{ width: `${(y.primary / maxTotal) * 100}%` }}
                      title={`สพป. ${fmt(y.primary)}`}
                    />
                    <div
                      className={`bg-gradient-to-r from-purple-400 to-purple-600 transition-all ${y.year === 2569 ? 'ring-2 ring-yellow-400' : ''}`}
                      style={{ width: `${(y.secondary / maxTotal) * 100}%` }}
                      title={`สพม. ${fmt(y.secondary)}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-5 p-4 bg-gradient-to-r from-primary-50 to-purple-50 rounded-xl border border-primary-100">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary-600 text-white flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 dark:text-slate-200">สรุปผลการวิเคราะห์ด่วน</div>
                <div className="text-sm text-gray-600 dark:text-slate-300 mt-1 leading-relaxed">
                  <strong className="text-primary-700">ภาษาอังกฤษเป็นอันดับ 5 ของความต้องการสูงที่สุด</strong>
                  ทั่วประเทศ มีอัตราขาด <strong>-5,123 ตำแหน่ง</strong> และรวม 10 ปีข้างหน้ามีอัตราเกษียณสะสมถึง{' '}
                  <strong>{fmt(s.cumulative10Year.total)} คน</strong> — นี่คือปีที่โอกาสสูง! อย่าพลาดเพราะ
                  <strong> ภาค ค ประวัติ+ผลงาน</strong> เหมือนปี 68
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Ranking + Strategy */}
        <div className="space-y-6">
          {/* Ranking */}
          <div className="card">
            <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              อันดับวิชาที่ต้องการครูมาก
            </h3>
            <ul className="space-y-2.5">
              {s.allSubjectsRank.slice(0, 8).map(r => (
                <li key={r.rank}>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      r.rank <= 3 ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' :
                      r.subject === 'ภาษาอังกฤษ' ? 'bg-primary-600 text-white ring-2 ring-primary-200 ring-offset-1' :
                      'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400'
                    }`}>
                      {r.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${r.subject === 'ภาษาอังกฤษ' ? 'text-primary-700' : 'text-gray-800 dark:text-slate-200'}`}>
                        {r.subject}
                        {r.subject === 'ภาษาอังกฤษ' && <span className="ml-1 text-[10px] text-primary-500">← วิชาคุณ</span>}
                      </div>
                      <div className="progress-bar mt-1 h-1">
                        <div className="progress-fill bg-gradient-to-r from-primary-400 to-purple-500" style={{ width: `${r.demandScore}%` }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[11px] text-red-500">ขาด {fmt(r.deficit)}</div>
                      <div className="text-[10px] text-gray-400 dark:text-slate-500">10ปี {fmt(r.tenYear)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategy Tips */}
          <div className="card border-2 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/20">
            <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              กลยุทธ์สมัครเพิ่มโอกาสติด
            </h3>
            <ol className="space-y-2.5">
              {s.strategy.map((tip, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-slate-300">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* 10 Year Cumulative Table */}
      <div className="card">
        <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2">
          <ChevronRight className="w-5 h-5 text-primary-600" />
          สรุปอัตราเกษียณ 10 ปี วิชาภาษาอังกฤษ (รายการ)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900 text-gray-600 dark:text-slate-400 border-b border-gray-200 dark:border-slate-700">
                <th className="text-left font-medium px-4 py-3 rounded-l-lg">ปีงบประมาณ</th>
                <th className="text-right font-medium px-4 py-3">สพป. ประถมศึกษา</th>
                <th className="text-right font-medium px-4 py-3">สพม. มัธยมศึกษา</th>
                <th className="text-right font-medium px-4 py-3 rounded-r-lg">รวมทั้งสิ้น</th>
              </tr>
            </thead>
            <tbody>
              {s.yearlyRetirements.map(y => (
                <tr key={y.year} className={`border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 ${y.year === 2569 ? 'bg-primary-50/60 dark:bg-primary-900/20' : ''}`}>
                  <td className="px-4 py-2.5 font-medium">
                    <span className={y.year === 2569 ? 'text-primary-700 dark:text-primary-400' : 'text-gray-800 dark:text-slate-200'}>
                      ปี {y.year}
                    </span>
                    {y.note && <span className="ml-2 text-[10px] text-gray-400 dark:text-slate-500">{y.note}</span>}
                  </td>
                  <td className="text-right px-4 py-2.5 text-blue-600 dark:text-blue-400 font-medium">{fmt(y.primary)}</td>
                  <td className="text-right px-4 py-2.5 text-purple-600 dark:text-purple-400 font-medium">{fmt(y.secondary)}</td>
                  <td className={`text-right px-4 py-2.5 font-bold ${y.year === 2569 ? 'text-primary-700 dark:text-primary-400 text-base' : 'text-gray-800 dark:text-slate-200'}`}>
                    {fmt(y.total)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 font-bold text-gray-800 dark:text-slate-200">
                <td className="px-4 py-3 rounded-l-lg">รวมสะสม 10 ปี</td>
                <td className="text-right px-4 py-3 text-blue-700 dark:text-blue-400">{fmt(s.cumulative10Year.primary)}</td>
                <td className="text-right px-4 py-3 text-purple-700 dark:text-purple-400">{fmt(s.cumulative10Year.secondary)}</td>
                <td className="text-right px-4 py-3 rounded-r-lg text-lg text-primary-700 dark:text-primary-400">
            {fmt(s.cumulative10Year.total)} อัตรา
          </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 dark:text-slate-500 mt-3">
          * ข้อมูลนี้แสดงอัตราเกษียณตามมาตรฐาน ซึ่งเป็นอัตราการเปิดรับสมัครขั้นต่ำที่คาดว่าจะเปิดจริงในแต่ละปี
        </p>
      </div>

      {/* ============ SECTION 5: 🧠 เครื่องมือเลือกเขตฉลาด 5 ด้าน ============ */}
      <div className="space-y-6 pt-2">
        {/* Section Banner */}
        <div className="card bg-gradient-to-br from-fuchsia-600 via-rose-500 to-orange-500 text-white border-0">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs mb-3">
                <Brain className="w-4 h-4" />
                Scoring Matrix · น้ำหนัก 40/30/12/10/8 %
              </div>
              <h2 className="text-2xl font-bold">🧠 เครื่องมือเลือกเขตฉลาด 5 ด้าน (อังกฤษ 2569)</h2>
              <p className="text-sm text-white/85 mt-1 max-w-2xl leading-relaxed">
                เลือกเขตผิด = คิดไปตลอดกาล ❗ ปี 68 อังกฤษ 6,645 คนสอบติด แต่เรียกบรรจุ 316 คน = 5% เท่านั้น
                <br />วิธีเลือก = [อัตราว่างปัจจุบัน] หาร [จำนวนคนสมัครวันสุดท้าย] + เช็กสถิติเรียกบรรจุย้อนหลัง
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <a href="https://www.kruphuchuay.com/" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/15 hover:bg-white/25 rounded-lg text-sm transition">
                <ExternalLink className="w-4 h-4" /> kruphuchuay.com
              </a>
            </div>
          </div>
        </div>

        {/* 7 ข้อห้าม */}
        <div className="card border-2 border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-900/20">
          <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            🚫 7 ข้อห้าม (ถ้าฝ่าฝืน → ติดบัญชีค้างตลอดชีพ)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {forbidRules.map((r, i) => (
              <div key={i} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-red-100 dark:border-red-900/50 hover:border-red-200 dark:hover:border-red-800 transition">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <r.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-red-600 dark:text-red-400 text-xs mb-0.5">{r.title}</div>
                    <div className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">{r.text}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5 ด้านวิเคราะห์ พร้อมน้ำหนัก */}
        <div className="card">
          <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-5 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary-600" />
            🎯 5 ด้านวิเคราะห์ + น้ำหนักรวม 100% (ชั่งน้ำหนักโดยคุณเอง Pantip มานาน)
          </h3>
          <div className="space-y-3.5">
            {scoreDimensions.map((d, i) => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-1.5 gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${d.color} text-white flex items-center justify-center flex-shrink-0 shadow-sm`}>
                      <d.icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-800 dark:text-slate-200">{d.name}</div>
                      <div className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">{d.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className={`text-lg font-black bg-gradient-to-r ${d.color} bg-clip-text text-transparent`}>
                      {d.weight}%
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-slate-500 w-14 text-right">
                      {i === 0 ? '#1 สำคัญสุด' : i === 1 ? '#2 รองลงมา' : i === 4 ? '#5 น้อยสุด' : `#${i+1}`}
                    </div>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${d.color} transition-all duration-500 rounded-full`}
                    style={{ width: `${d.weight}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
            <div className="flex items-start gap-2.5">
              <BadgeCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold text-amber-700 dark:text-amber-400">สูตรการคิดคะแนนรวม (0-100):</span><br />
                <code className="bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded text-amber-800 dark:text-amber-300 text-xs font-mono">
                  Total = (ว่าง×0.40) + (คนสมัคร×0.30) + (โรงเรียน×0.12) + (ประวัติ×0.10) + (ระยะทาง×0.08)
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring Matrix Table */}
        <div className="card">
          <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-5 flex items-center gap-2 flex-wrap">
            <Trophy className="w-5 h-5 text-yellow-500" />
            📊 ตาราง Scoring Matrix เปรียบเทียบ 6 เขต (คะแนน 0-100 + อันดับ)
            <span className="ml-2 text-[11px] text-gray-400 dark:text-slate-500 font-normal">
              ข้อมูล ณ 27 ก.ย. 69 · ยังไม่ครบ 239 เขต → รออัพเดท 12 ต.ค. 69 ใหม่ทุกเขต
            </span>
          </h3>
          <div className="overflow-x-auto -mx-4 -my-2 px-4 py-2">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 text-gray-700 dark:text-slate-300 border-y-2 border-gray-200 dark:border-slate-700">
                  <th className="text-center font-bold px-3 py-3 rounded-l-lg">#</th>
                  <th className="text-left font-bold px-3 py-3">เขตพื้นที่</th>
                  <th className="text-center font-bold px-3 py-3">
                    <span className="text-red-500">ว่างจริง</span><sup className="text-[10px]">40%</sup>
                  </th>
                  <th className="text-center font-bold px-3 py-3">
                    <span className="text-orange-500">คนสมัคร</span><sup className="text-[10px]">30%</sup>
                  </th>
                  <th className="text-center font-bold px-3 py-3">
                    <span className="text-blue-500">โรงเรียน</span><sup className="text-[10px]">12%</sup>
                  </th>
                  <th className="text-center font-bold px-3 py-3">
                    <span className="text-purple-500">ประวัติ</span><sup className="text-[10px]">10%</sup>
                  </th>
                  <th className="text-center font-bold px-3 py-3">
                    <span className="text-emerald-500">ระยะทาง</span><sup className="text-[10px]">8%</sup>
                  </th>
                  <th className="text-center font-bold px-3 py-3 rounded-r-lg bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40">
                    🏅 คะแนนรวม
                  </th>
                </tr>
              </thead>
              <tbody>
                {districtScores.map(d => {
                  const rankColor = d.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-white' :
                                     d.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white' :
                                     d.rank === 3 ? 'bg-gradient-to-br from-orange-300 to-orange-500 text-white' :
                                     'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400'
                  const totalBarColor = d.total >= 80 ? 'from-emerald-400 to-green-600' :
                                        d.total >= 65 ? 'from-sky-400 to-blue-600' :
                                        d.total >= 50 ? 'from-amber-400 to-orange-500' :
                                        'from-red-400 to-red-600'
                  return (
                    <tr key={d.name} className={`border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition ${
                      d.candidate ? 'bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 hover:from-indigo-50 dark:hover:from-indigo-900/30 hover:to-purple-50 dark:hover:to-purple-900/30' : ''
                    }`}>
                      <td className="text-center px-3 py-3.5">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black shadow-sm ${rankColor}`}>
                          {['🥇','🥈','🥉'][d.rank-1] || d.rank}
                        </span>
                      </td>
                      <td className="px-3 py-3.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`font-bold ${d.candidate ? 'text-indigo-800 dark:text-indigo-400' : 'text-gray-800 dark:text-slate-200'}`}>
                            {d.name}
                          </span>
                          {d.candidate && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold">
                              👤 Candidate {d.candidateTag}
                            </span>
                          )}
                        </div>
                      </td>
                      {[['vacancy','red','bg-red-50 dark:bg-red-900/30'],['applicant','orange','bg-orange-50 dark:bg-orange-900/30'],['school','blue','bg-blue-50 dark:bg-blue-900/30'],['history','purple','bg-purple-50 dark:bg-purple-900/30'],['distance','emerald','bg-emerald-50 dark:bg-emerald-900/30']].map(([k,color,bgCls]) => (
                        <td key={k} className="text-center px-3 py-3.5">
                          <div className="flex flex-col items-center gap-1">
                            <div className={`font-bold text-${color}-600 dark:text-${color}-400 text-base`}>{d[k]}</div>
                            <div className={`w-16 h-1.5 ${bgCls} rounded-full overflow-hidden`}>
                              <div className={`h-full bg-${color}-500 rounded-full`} style={{ width: `${d[k]}%` }} />
                            </div>
                            <div className="text-[9px] text-gray-400 dark:text-slate-500 leading-tight max-w-[90px] truncate" title={d[`${k}_note`]}>
                              {d[`${k}_note`]}
                            </div>
                          </div>
                        </td>
                      ))}
                      <td className="text-center px-3 py-3.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-r-lg">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={`text-2xl font-black bg-gradient-to-r ${totalBarColor} bg-clip-text text-transparent leading-none`}>
                            {d.total}
                          </div>
                          <div className="w-20 h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-gradient-to-r ${totalBarColor} rounded-full transition-all`}
                              style={{ width: `${d.total}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-gray-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-indigo-500" /> Candidate A/B = 2 แห่งที่คุณมองไว้ในใจ (พิจิตร2/ตาก2)</div>
            <div className="flex items-center gap-1.5"><AlertCircle className="w-3.5 h-3.5 text-amber-500" /> คะแนน ≥ 80 = เขตทอง · 65-79 = เขตดี · 50-64 = พอใช้ · {'<'}50 = หลีกเลี่ยง</div>
            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-sky-500" /> อัพเดทคะแนนซ้ำอีกครั้ง 12 ต.ค. (ประกาศครบ) และ 24-25 ต.ค. (ยอดสมัครสุดท้าย)</div>
          </div>
        </div>

        {/* เปรียบเทียบ 2 Candidate */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2 text-lg">
            <Swords className="w-6 h-6 text-rose-500" />
            ⚔️ เปรียบเทียบ 2 Candidate ในใจ: พิจิตร เขต 2 (A) VS ตาก เขต 2 (B)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {candidateCompare.map((c, idx) => (
              <div key={idx} className={`card bg-gradient-to-br ${c.color} border-2 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                  {c.ribbon}
                </div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-slate-200 mb-4 pr-20">{c.title}</h4>
                {/* Pros */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
                    <ThumbsUp className="w-4 h-4" /> ✅ ข้อดี
                  </div>
                  <ul className="space-y-1.5">
                    {c.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-800/60 rounded-lg p-2 border border-emerald-100 dark:border-emerald-900/50">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Cons */}
                <div className="mb-4">
                  <div className="flex items-center gap-1.5 mb-2 text-rose-700 dark:text-rose-400 text-sm font-bold">
                    <ThumbsDown className="w-4 h-4" /> ❌ ข้อเสีย / เตือน
                  </div>
                  <ul className="space-y-1.5">
                    {c.cons.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-800/60 rounded-lg p-2 border border-rose-100 dark:border-rose-900/50">
                        <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Verdict */}
                <div className={`mt-2 p-3 rounded-xl border-2 ${c.verdictColor} text-sm leading-relaxed`}>
                  <div className="font-bold mb-1 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    สรุปคำตัดสินใจฉลาด (Final Verdict)
                  </div>
                  <div>{c.finalVerdict}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Recommendation */}
        <div className="card border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
          <h3 className="font-semibold text-gray-800 dark:text-slate-200 mb-4 flex items-center gap-2 text-lg">
            <Trophy className="w-6 h-6 text-yellow-500" />
            ⭐ Top 5 เขตแนะนำ ณ ตอนนี้ (อ้างอิง 27 ก.ย. 69 — ยังไม่ครบ 246 เขต!)
          </h3>
          <div className="space-y-2.5">
            {top5Recommendations.map(r => {
              const medal = r.no === 1 ? '🥇' : r.no === 2 ? '🥈' : r.no === 3 ? '🥉' : `${r.no}.`
              const barColor = r.score >= 80 ? 'from-emerald-400 to-green-600' :
                               r.score >= 65 ? 'from-sky-400 to-blue-600' :
                               'from-amber-400 to-orange-500'
              return (
                <div key={r.no} className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900/50 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-2xl">{medal}</span>
                      <div>
                        <div className="font-bold text-gray-800 dark:text-slate-200 text-base">{r.name}</div>
                        <div className="text-[11px] text-gray-400 dark:text-slate-500">เขตแนะนำอันดับ {r.no}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className={`text-2xl font-black bg-gradient-to-r ${barColor} bg-clip-text text-transparent`}>
                        {r.score}
                      </div>
                      <div className="w-24 h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${barColor} rounded-full`} style={{ width: `${r.score}%` }} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-[250px] text-sm text-gray-700 dark:text-slate-300 leading-relaxed bg-emerald-50/50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-100 dark:border-emerald-900/50">
                      💡 {r.reason}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Hard Reminder: วันสำคัญ + Slot Reminder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-gradient-to-br from-sky-500 to-blue-600 text-white border-0">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4.5 h-4.5" />
              <span className="text-xs opacity-90 font-bold uppercase tracking-wider">Milestone 1</span>
            </div>
            <div className="text-2xl font-black">12 ต.ค. 69</div>
            <div className="text-sm opacity-95 mt-1 leading-relaxed">
              ✅ ประกาศเขตครบ 246 เขต<br />
              <span className="text-white/80 text-xs">→ เปิด Info.jsx อัพเดทคะแนน Scoring Matrix ใหม่ทุกเขต</span>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-rose-500 to-pink-600 text-white border-0 ring-2 ring-pink-300 ring-offset-2">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4.5 h-4.5" />
              <span className="text-xs opacity-90 font-bold uppercase tracking-wider">⚠️ HARD RULE เด็ดขาด</span>
            </div>
            <div className="text-2xl font-black">24-25 ต.ค. 69</div>
            <div className="text-sm opacity-95 mt-1 leading-relaxed">
              🚫 ห้ามยื่นสมัครก่อนวันที่ 24!<br />
              <span className="text-white/90 text-xs">
                → สมัครวันที่ 6-7 ของช่วง 19-25 ต.ค. ดูยอดคนสมัครสุดท้าย → เปรียบเทียบ 5 เขต → ยื่นเขตที่อัตราส่วน น้อยสุด!
              </span>
            </div>
          </div>
          <div className="card bg-gradient-to-br from-violet-500 to-purple-600 text-white border-0">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4.5 h-4.5" />
              <span className="text-xs opacity-90 font-bold uppercase tracking-wider">Workflow ยืนยันจากคุณ</span>
            </div>
            <div className="text-base font-black leading-tight">
              ตรวจเขตเปิดอังกฤษ<br />
              → สำรวจว่างปัจจุบัน<br />
              → รอ 24 ต.ค. ดูยอดสมัคร<br />
              → ยื่นเขต [ว่างเยอะที่สุด / คนสมัครน้อยสุด]
            </div>
          </div>
        </div>

        {/* Pantip Guru Disclaimer */}
        <div className="p-5 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 text-center">
          <div className="text-base text-gray-700 dark:text-slate-300 leading-relaxed">
            <Brain className="w-5 h-5 text-purple-500 inline-block mr-1.5 align-[-3px]" />
            <strong className="text-gray-800 dark:text-slate-200">"เป็นครูต้องคิดซับซ้อนหน่อย อย่ามองแต่ปัจจุบัน คิดรวบยอดและซับซ้อน"</strong><br />
            <span className="text-sm text-gray-500 dark:text-slate-400 mt-1 inline-block">
              — คำพูดจากคุณเอง (Pantip ให้คำแนะนำคนอื่นมาเป็นปี)
            </span>
          </div>
        </div>
      </div>
      {/* ============ END SECTION 5: เลือกเขตฉลาด ============ */}
    </div>
  )
}
