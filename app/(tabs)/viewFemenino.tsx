import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// ── DATOS (reemplaza con tu contexto/estado real) ──
const CYCLE_DAY = 10;
const CYCLE_LENGTH = 28;
const NEXT_PERIOD_IN = 8;
const TODAY = 27;
const MONTH = 'Abril 2026';

const CALENDAR_DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = i + 1;
  if (d >= 2 && d <= 6) return { day: d, type: 'period' };
  if (d === 28) return { day: d, type: 'ovulation' };
  if (d >= 25 && d <= 29) return { day: d, type: 'fertile' };
  if (d >= 30) return { day: d, type: 'predicted' };
  return { day: d, type: 'normal' };
});
const FIRST_DAY_OFFSET = 2; // Abril 2026 empieza en miércoles

const MOODS = [
  { emoji: '😊', label: 'Bien' },
  { emoji: '😐', label: 'Normal' },
  { emoji: '😔', label: 'Triste' },
  { emoji: '😤', label: 'Irritable' },
  { emoji: '😴', label: 'Cansada' },
  { emoji: '🤩', label: 'Genial' },
];

const MOOD_FEEDBACK = [
  '¡Qué bien! Aprovecha esta energía positiva hoy 🌸',
  'Un día normal también está bien. Cuídate mucho 💕',
  'Es válido sentirte así. Date un momento para ti 🫂',
  'La irritabilidad puede ser hormonal. Respira profundo 🌿',
  'Tu cuerpo pide descanso. Escúchalo 😴',
  '¡Energía al máximo! Es un gran día para tus metas 🌟',
];

const SKINCARE_MORNING = [
  'Limpiador suave',
  'Tónico hidratante',
  'Vitamina C',
  'Hidratante SPF 50',
];

const SKINCARE_NIGHT = [
  'Limpiador en aceite',
  'Limpiador espuma',
  'Sérum retinol',
  'Contorno de ojos',
  'Crema nutritiva',
];

const WELLNESS_TIPS = [
  { icon: '🥗', title: 'Nutrición', desc: 'Aumenta hierro y folatos: espinacas, legumbres y frutos secos son tus aliados esta semana.' },
  { icon: '🏃‍♀️', title: 'Ejercicio', desc: 'En fase folicular tu energía está al máximo. Ideal para entrenamientos de alta intensidad.' },
  { icon: '🧘‍♀️', title: 'Mindfulness', desc: 'Dedica 10 minutos al día a respiración consciente para equilibrar tus hormonas.' },
  { icon: '☀️', title: 'Vitamina D', desc: 'Sal al sol al menos 15 minutos al día para mejorar tu estado de ánimo y huesos.' },
];

const DAYS_HEADER = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function FemaleHome() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [waterGlasses, setWaterGlasses] = useState(3);
  const [sleepHours, setSleepHours] = useState(7);
  const [morningDone, setMorningDone] = useState(SKINCARE_MORNING.map(() => false));
  const [nightDone, setNightDone] = useState(SKINCARE_NIGHT.map(() => false));

  const toggleMorning = (i: number) =>
    setMorningDone((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  const toggleNight = (i: number) =>
    setNightDone((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const WATER_GOAL = 8;
  const SLEEP_GOAL = 8;
  const waterPct = Math.min((waterGlasses / WATER_GOAL) * 100, 100);
  const sleepPct = Math.min((sleepHours / SLEEP_GOAL) * 100, 100);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.greeting}>Hola, bienvenida 👋</ThemedText>
          <ThemedText style={styles.date}>Lunes, 27 de abril</ThemedText>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <ThemedText style={styles.avatarText}>A</ThemedText>
        </TouchableOpacity>
      </View>

      {/* ── CALENDARIO MENSTRUAL ── */}
      <ThemedText style={styles.sectionTitle}>Calendario menstrual</ThemedText>
      <View style={styles.card}>

        {/* Stats del ciclo */}
        <View style={styles.cycleRow}>
          <View style={styles.cycleStatBox}>
            <ThemedText style={styles.cycleStatNum}>{CYCLE_DAY}</ThemedText>
            <ThemedText style={styles.cycleStatLabel}>Día del{'\n'}ciclo</ThemedText>
          </View>
          <View style={[styles.cycleStatBox, { borderColor: '#C4B5FD' }]}>
            <ThemedText style={[styles.cycleStatNum, { color: '#7C3AED' }]}>{NEXT_PERIOD_IN}</ThemedText>
            <ThemedText style={styles.cycleStatLabel}>Días para{'\n'}período</ThemedText>
          </View>
          <View style={[styles.cycleStatBox, { borderColor: '#6EE7B7' }]}>
            <ThemedText style={[styles.cycleStatNum, { color: '#059669' }]}>{CYCLE_LENGTH}</ThemedText>
            <ThemedText style={styles.cycleStatLabel}>Duración{'\n'}ciclo</ThemedText>
          </View>
        </View>

        {/* Fase badge */}
        <View style={styles.phaseBadge}>
          <View style={styles.phaseDot} />
          <ThemedText style={styles.phaseText}>
            Fase folicular · Día {CYCLE_DAY} de {CYCLE_LENGTH}
          </ThemedText>
        </View>

        {/* Barra de progreso del ciclo */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${(CYCLE_DAY / CYCLE_LENGTH) * 100}%` as any }]} />
        </View>
        <View style={styles.progressLabels}>
          <ThemedText style={styles.progressLabel}>Día 1</ThemedText>
          <ThemedText style={styles.progressLabel}>Día {CYCLE_LENGTH}</ThemedText>
        </View>

        {/* Grid calendario */}
        <ThemedText style={styles.calMonthTitle}>{MONTH}</ThemedText>
        <View style={styles.calDaysHeader}>
          {DAYS_HEADER.map((d) => (
            <ThemedText key={d} style={styles.calDayHeader}>{d}</ThemedText>
          ))}
        </View>
        <View style={styles.calGrid}>
          {Array.from({ length: FIRST_DAY_OFFSET }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.calCell} />
          ))}
          {CALENDAR_DAYS.map(({ day, type }) => {
            const isToday = day === TODAY;
            const bg =
              type === 'period' ? '#F9A8D4' :
              type === 'ovulation' ? '#5DCAA5' :
              type === 'fertile' ? '#D1FAE5' :
              type === 'predicted' ? '#FDE8F5' :
              'transparent';
            const color =
              type === 'period' ? '#9D174D' :
              type === 'ovulation' ? '#064E3B' :
              type === 'fertile' ? '#065F46' :
              type === 'predicted' ? '#BE185D' :
              '#374151';
            return (
              <View
                key={day}
                style={[
                  styles.calCell,
                  { backgroundColor: bg },
                  isToday && styles.calToday,
                ]}
              >
                <ThemedText style={[styles.calDayText, { color }, isToday && styles.calTodayText]}>
                  {day}
                </ThemedText>
              </View>
            );
          })}
        </View>

        {/* Leyenda */}
        <View style={styles.legend}>
          <View style={styles.legItem}><View style={[styles.legDot, { backgroundColor: '#F9A8D4' }]} /><ThemedText style={styles.legLabel}>Período</ThemedText></View>
          <View style={styles.legItem}><View style={[styles.legDot, { backgroundColor: '#D1FAE5' }]} /><ThemedText style={styles.legLabel}>Fértil</ThemedText></View>
          <View style={styles.legItem}><View style={[styles.legDot, { backgroundColor: '#5DCAA5' }]} /><ThemedText style={styles.legLabel}>Ovulación</ThemedText></View>
          <View style={styles.legItem}><View style={[styles.legDot, { backgroundColor: '#FDE8F5' }]} /><ThemedText style={styles.legLabel}>Predicho</ThemedText></View>
        </View>
      </View>

      {/* ── SUEÑO Y AGUA ── */}
      <View style={styles.rowTwo}>

        {/* Sueño */}
        <View style={[styles.card, styles.halfCard]}>
          <ThemedText style={styles.trackTitle}>🌙 Sueño</ThemedText>
          <ThemedText style={styles.trackValue}>
            {sleepHours}<ThemedText style={styles.trackUnit}> h</ThemedText>
          </ThemedText>
          <ThemedText style={styles.trackGoal}>Meta: {SLEEP_GOAL} horas</ThemedText>
          <View style={[styles.progressBg, { marginBottom: 10 }]}>
            <View style={[styles.progressFill, { width: `${sleepPct}%` as any, backgroundColor: '#A78BFA' }]} />
          </View>
          <View style={styles.trackBtns}>
            <TouchableOpacity
              style={styles.trackBtn}
              onPress={() => setSleepHours((h) => Math.max(0, parseFloat((h - 0.5).toFixed(1))))}
            >
              <ThemedText style={styles.trackBtnText}>−</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.trackBtn}
              onPress={() => setSleepHours((h) => Math.min(12, parseFloat((h + 0.5).toFixed(1))))}
            >
              <ThemedText style={styles.trackBtnText}>+</ThemedText>
            </TouchableOpacity>
          </View>
          <ThemedText style={styles.trackTip}>
            {sleepHours >= 8 ? '✓ ¡Excelente!' : sleepHours >= 6 ? 'Intenta llegar a 8 h' : 'Necesitas más descanso'}
          </ThemedText>
        </View>

        {/* Agua */}
        <View style={[styles.card, styles.halfCard]}>
          <ThemedText style={styles.trackTitle}>💧 Agua</ThemedText>
          <ThemedText style={styles.trackValue}>
            {waterGlasses}<ThemedText style={styles.trackUnit}> vasos</ThemedText>
          </ThemedText>
          <ThemedText style={styles.trackGoal}>Meta: {WATER_GOAL} (2 L)</ThemedText>
          <View style={[styles.progressBg, { marginBottom: 10 }]}>
            <View style={[styles.progressFill, { width: `${waterPct}%` as any, backgroundColor: '#38BDF8' }]} />
          </View>
          <View style={styles.glassesGrid}>
            {Array.from({ length: WATER_GOAL }).map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setWaterGlasses(i + 1)}>
                <ThemedText style={{ fontSize: 16, opacity: i < waterGlasses ? 1 : 0.2 }}>💧</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          <ThemedText style={styles.trackTip}>
            {waterGlasses >= WATER_GOAL ? '✓ ¡Meta lograda!' : `Faltan ${WATER_GOAL - waterGlasses} vasos`}
          </ThemedText>
        </View>
      </View>

      {/* ── CÓMO TE SIENTES HOY ── */}
      <ThemedText style={styles.sectionTitle}>¿Cómo te sientes hoy?</ThemedText>
      <View style={styles.card}>
        <View style={styles.moodGrid}>
          {MOODS.map((m, i) => (
            <TouchableOpacity
              key={m.label}
              style={[styles.moodBtn, selectedMood === i && styles.moodBtnActive]}
              onPress={() => setSelectedMood(i)}
              activeOpacity={0.8}
            >
              <ThemedText style={styles.moodEmoji}>{m.emoji}</ThemedText>
              <ThemedText style={[styles.moodLabel, selectedMood === i && styles.moodLabelActive]}>
                {m.label}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        {selectedMood !== null && (
          <View style={styles.moodFeedback}>
            <ThemedText style={styles.moodFeedbackText}>
              {MOOD_FEEDBACK[selectedMood]}
            </ThemedText>
          </View>
        )}
      </View>

      {/* ── SKINCARE MAÑANA ── */}
      <ThemedText style={styles.sectionTitle}>Rutina mañana ☀️</ThemedText>
      <View style={styles.card}>
        <View style={styles.skincareHeader}>
          <ThemedText style={styles.skincareSubtitle}>Pasos completados</ThemedText>
          <ThemedText style={styles.skincareDone}>
            {morningDone.filter(Boolean).length}/{SKINCARE_MORNING.length}
          </ThemedText>
        </View>
        {SKINCARE_MORNING.map((step, i) => (
          <TouchableOpacity
            key={step}
            style={[styles.skincareStep, i === SKINCARE_MORNING.length - 1 && { borderBottomWidth: 0 }]}
            onPress={() => toggleMorning(i)}
            activeOpacity={0.7}
          >
            <View style={[styles.stepCheck, morningDone[i] && styles.stepCheckDone]}>
              {morningDone[i] && <ThemedText style={styles.stepCheckMark}>✓</ThemedText>}
            </View>
            <ThemedText style={[styles.stepText, morningDone[i] && styles.stepTextDone]}>
              {step}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── SKINCARE NOCHE ── */}
      <ThemedText style={styles.sectionTitle}>Rutina noche 🌙</ThemedText>
      <View style={styles.card}>
        <View style={styles.skincareHeader}>
          <ThemedText style={styles.skincareSubtitle}>Pasos completados</ThemedText>
          <ThemedText style={styles.skincareDone}>
            {nightDone.filter(Boolean).length}/{SKINCARE_NIGHT.length}
          </ThemedText>
        </View>
        {SKINCARE_NIGHT.map((step, i) => (
          <TouchableOpacity
            key={step}
            style={[styles.skincareStep, i === SKINCARE_NIGHT.length - 1 && { borderBottomWidth: 0 }]}
            onPress={() => toggleNight(i)}
            activeOpacity={0.7}
          >
            <View style={[styles.stepCheck, nightDone[i] && styles.stepCheckDone]}>
              {nightDone[i] && <ThemedText style={styles.stepCheckMark}>✓</ThemedText>}
            </View>
            <ThemedText style={[styles.stepText, nightDone[i] && styles.stepTextDone]}>
              {step}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── TIPS DE BIENESTAR ── */}
      <ThemedText style={styles.sectionTitle}>Tips de bienestar</ThemedText>
      <View style={styles.tipsGrid}>
        {WELLNESS_TIPS.map((tip) => (
          <View key={tip.title} style={styles.tipCard}>
            <ThemedText style={styles.tipIcon}>{tip.icon}</ThemedText>
            <ThemedText style={styles.tipTitle}>{tip.title}</ThemedText>
            <ThemedText style={styles.tipDesc}>{tip.desc}</ThemedText>
          </View>
        ))}
      </View>

      {/* CTA */}
      <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/cycle-detail')}>
        <ThemedText style={styles.ctaBtnText}>Ver detalle del ciclo →</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const PINK = '#F472B6';
const DEEP_PINK = '#BE185D';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5FB' },
  content: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 },
  greeting: { fontSize: 22, fontWeight: '700', color: '#1F2937' },
  date: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: PINK, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },

  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1F2937', marginBottom: 10, marginTop: 8 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    shadowColor: PINK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
  },

  // Cycle stats
  cycleRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  cycleStatBox: { flex: 1, borderWidth: 1, borderColor: '#FBCFE8', borderRadius: 12, padding: 10, alignItems: 'center' },
  cycleStatNum: { fontSize: 22, fontWeight: '800', color: DEEP_PINK },
  cycleStatLabel: { fontSize: 10, color: '#9CA3AF', textAlign: 'center', marginTop: 2, lineHeight: 14 },

  phaseBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FDF2F8', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginBottom: 12 },
  phaseDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: PINK },
  phaseText: { fontSize: 12, color: DEEP_PINK, fontWeight: '600' },

  progressBg: { height: 7, backgroundColor: '#FCE7F3', borderRadius: 4, marginBottom: 4 },
  progressFill: { height: 7, backgroundColor: PINK, borderRadius: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  progressLabel: { fontSize: 11, color: '#9CA3AF' },

  // Calendar
  calMonthTitle: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8, textAlign: 'center' },
  calDaysHeader: { flexDirection: 'row', marginBottom: 4 },
  calDayHeader: { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '600', color: '#9CA3AF' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 100, marginVertical: 1 },
  calDayText: { fontSize: 12, fontWeight: '500' },
  calToday: { borderWidth: 2, borderColor: PINK },
  calTodayText: { color: DEEP_PINK, fontWeight: '800' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  legItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legDot: { width: 10, height: 10, borderRadius: 5 },
  legLabel: { fontSize: 11, color: '#6B7280' },

  // Sleep & Water
  rowTwo: { flexDirection: 'row', gap: 12 },
  halfCard: { flex: 1 },
  trackTitle: { fontSize: 13, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  trackValue: { fontSize: 24, fontWeight: '800', color: DEEP_PINK },
  trackUnit: { fontSize: 13, fontWeight: '400', color: '#9CA3AF' },
  trackGoal: { fontSize: 10, color: '#9CA3AF', marginBottom: 8 },
  trackBtns: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  trackBtn: { flex: 1, backgroundColor: '#FDF2F8', borderRadius: 10, paddingVertical: 6, alignItems: 'center', borderWidth: 1, borderColor: '#FBCFE8' },
  trackBtnText: { fontSize: 18, color: DEEP_PINK, fontWeight: '700' },
  trackTip: { fontSize: 10, color: '#6B7280', marginTop: 4 },
  glassesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 4 },

  // Mood
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moodBtn: { width: '30%', alignItems: 'center', backgroundColor: '#FDF2F8', borderRadius: 14, paddingVertical: 10, borderWidth: 1, borderColor: '#FCE7F3' },
  moodBtnActive: { backgroundColor: '#FCE7F3', borderColor: PINK },
  moodEmoji: { fontSize: 22, marginBottom: 4 },
  moodLabel: { fontSize: 11, color: '#6B7280' },
  moodLabelActive: { color: DEEP_PINK, fontWeight: '600' },
  moodFeedback: { marginTop: 12, backgroundColor: '#FDF2F8', borderRadius: 12, padding: 12 },
  moodFeedbackText: { fontSize: 13, color: DEEP_PINK, lineHeight: 19, textAlign: 'center' },

  // Skincare
  skincareHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  skincareSubtitle: { fontSize: 13, color: '#6B7280' },
  skincareDone: { fontSize: 13, color: PINK, fontWeight: '700' },
  skincareStep: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#F3F4F6' },
  stepCheck: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center' },
  stepCheckDone: { backgroundColor: PINK, borderColor: PINK },
  stepCheckMark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  stepText: { fontSize: 14, color: '#374151' },
  stepTextDone: { color: '#9CA3AF', textDecorationLine: 'line-through' },

  // Tips
  tipsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  tipCard: { width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#FCE7F3', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  tipIcon: { fontSize: 22, marginBottom: 6 },
  tipTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  tipDesc: { fontSize: 12, color: '#6B7280', lineHeight: 17 },

  // CTA
  ctaBtn: { backgroundColor: DEEP_PINK, borderRadius: 14, paddingVertical: 15, alignItems: 'center', shadowColor: DEEP_PINK, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  ctaBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
});