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

// ── DATOS ──
const TODAY = 27;
const MONTH = 'Abril 2026';
const FIRST_DAY_OFFSET = 2; // Abril 2026 empieza en miércoles

// Días con entrenamiento completado
const WORKOUT_DONE_DAYS = new Set([1, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24]);
const REST_DAYS = new Set([2, 4, 6, 9, 11, 13, 16, 18, 20, 23]);

const CALENDAR_DAYS = Array.from({ length: 30 }, (_, i) => {
  const d = i + 1;
  if (WORKOUT_DONE_DAYS.has(d)) return { day: d, type: 'done' };
  if (REST_DAYS.has(d)) return { day: d, type: 'rest' };
  return { day: d, type: 'normal' };
});

const DAYS_HEADER = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const MOODS = [
  { emoji: '💪', label: 'Fuerte' },
  { emoji: '😊', label: 'Bien' },
  { emoji: '😐', label: 'Normal' },
  { emoji: '😴', label: 'Cansado' },
  { emoji: '😤', label: 'Estresado' },
  { emoji: '🤒', label: 'Mal' },
];

const MOOD_FEEDBACK = [
  '¡Perfecto para entrenar! Aprovecha esta energía 🔥',
  'Buen día para mantener tu rutina con constancia 💪',
  'Un día normal. Cumple tu plan aunque no tengas ganas 🎯',
  'Tu cuerpo pide descanso. Considera un día de recuperación 😴',
  'El ejercicio reduce el estrés. Una sesión suave te ayudará 🧘‍♂️',
  'Descansa hoy. La recuperación también es parte del entrenamiento 🩺',
];

const WORKOUT_PLAN = [
  {
    day: 'Lunes',
    focus: 'Pecho + Tríceps',
    emoji: '🏋️',
    exercises: ['Press banca 4×10', 'Press inclinado 3×12', 'Fondos 3×15', 'Extensiones tríceps 3×12'],
  },
  {
    day: 'Martes',
    focus: 'Espalda + Bíceps',
    emoji: '💪',
    exercises: ['Dominadas 4×8', 'Remo con barra 4×10', 'Jalón polea 3×12', 'Curl mancuernas 3×12'],
  },
  {
    day: 'Miércoles',
    focus: 'Descanso activo',
    emoji: '🧘‍♂️',
    exercises: ['Caminata 30 min', 'Estiramientos 15 min', 'Foam roller'],
    isRest: true,
  },
  {
    day: 'Jueves',
    focus: 'Piernas + Glúteos',
    emoji: '🦵',
    exercises: ['Sentadilla 4×10', 'Prensa 3×12', 'Zancadas 3×12', 'Curl femoral 3×15'],
  },
  {
    day: 'Viernes',
    focus: 'Hombros + Core',
    emoji: '🏅',
    exercises: ['Press militar 4×10', 'Elevaciones laterales 3×15', 'Plancha 3×60s', 'Abdominales 3×20'],
  },
  {
    day: 'Sábado',
    focus: 'Cardio + HIIT',
    emoji: '🏃‍♂️',
    exercises: ['Calentamiento 5 min', 'HIIT 20 min', 'Trote suave 10 min', 'Enfriamiento 5 min'],
  },
  {
    day: 'Domingo',
    focus: 'Descanso total',
    emoji: '😴',
    exercises: ['Recuperación completa', 'Hidratación extra', 'Sueño de calidad'],
    isRest: true,
  },
];

const WELLNESS_TIPS = [
  { icon: '🥩', title: 'Proteína', desc: 'Consume 1.6–2 g de proteína por kg de peso para maximizar la ganancia muscular.' },
  { icon: '🧘‍♂️', title: 'Estrés', desc: '5 minutos de respiración profunda al día reducen el cortisol y mejoran el rendimiento.' },
  { icon: '🍌', title: 'Pre-entreno', desc: 'Come carbohidratos complejos 1–2 horas antes de entrenar para mayor energía.' },
  { icon: '🧊', title: 'Recuperación', desc: 'El hielo en zonas doloridas durante 15 min reduce la inflamación muscular.' },
];

const TODAY_WORKOUT_IDX = 0; // Lunes = índice 0

export default function MaleHome() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [sleepHours, setSleepHours] = useState(7);
  const [selectedDay, setSelectedDay] = useState(TODAY_WORKOUT_IDX);
  const [exerciseDone, setExerciseDone] = useState<boolean[][]>(
    WORKOUT_PLAN.map((d) => d.exercises.map(() => false))
  );

  const toggleExercise = (dayIdx: number, exIdx: number) => {
    setExerciseDone((prev) =>
      prev.map((day, di) =>
        di !== dayIdx ? day : day.map((v, ei) => (ei === exIdx ? !v : v))
      )
    );
  };

  const WATER_GOAL = 10; // hombres: ~2.5 L = 10 vasos
  const SLEEP_GOAL = 8;
  const waterPct = Math.min((waterGlasses / WATER_GOAL) * 100, 100);
  const sleepPct = Math.min((sleepHours / SLEEP_GOAL) * 100, 100);

  const currentWorkout = WORKOUT_PLAN[selectedDay];
  const currentDone = exerciseDone[selectedDay];
  const completedExercises = currentDone.filter(Boolean).length;

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
          <ThemedText style={styles.greeting}>Hola, bienvenido 👋</ThemedText>
          <ThemedText style={styles.date}>Lunes, 27 de abril</ThemedText>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <ThemedText style={styles.avatarText}>A</ThemedText>
        </TouchableOpacity>
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
            <View style={[styles.progressFill, { width: `${sleepPct}%` as any, backgroundColor: '#818CF8' }]} />
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
          <ThemedText style={styles.trackGoal}>Meta: {WATER_GOAL} (2.5 L)</ThemedText>
          <View style={[styles.progressBg, { marginBottom: 10 }]}>
            <View style={[styles.progressFill, { width: `${waterPct}%` as any, backgroundColor: '#38BDF8' }]} />
          </View>
          <View style={styles.glassesGrid}>
            {Array.from({ length: WATER_GOAL }).map((_, i) => (
              <TouchableOpacity key={i} onPress={() => setWaterGlasses(i + 1)}>
                <ThemedText style={{ fontSize: 14, opacity: i < waterGlasses ? 1 : 0.2 }}>💧</ThemedText>
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

      {/* ── RUTINA DE EJERCICIOS ── */}
      <ThemedText style={styles.sectionTitle}>Rutina de ejercicios</ThemedText>

      {/* Calendario de actividad del mes */}
      <View style={styles.card}>
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
              type === 'done' ? '#BFDBFE' :
              type === 'rest' ? '#F3F4F6' :
              'transparent';
            const color =
              type === 'done' ? '#1E40AF' :
              type === 'rest' ? '#9CA3AF' :
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
          <View style={styles.legItem}><View style={[styles.legDot, { backgroundColor: '#BFDBFE' }]} /><ThemedText style={styles.legLabel}>Entrenamiento</ThemedText></View>
          <View style={styles.legItem}><View style={[styles.legDot, { backgroundColor: '#F3F4F6' }]} /><ThemedText style={styles.legLabel}>Descanso</ThemedText></View>
          <View style={styles.legItem}><View style={[styles.legDot, { borderWidth: 2, borderColor: BLUE }]} /><ThemedText style={styles.legLabel}>Hoy</ThemedText></View>
        </View>

        {/* Stats rápidos */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <ThemedText style={styles.statNum}>{WORKOUT_DONE_DAYS.size}</ThemedText>
            <ThemedText style={styles.statLabel}>Sesiones este mes</ThemedText>
          </View>
          <View style={styles.statBox}>
            <ThemedText style={styles.statNum}>5</ThemedText>
            <ThemedText style={styles.statLabel}>Racha actual</ThemedText>
          </View>
          <View style={styles.statBox}>
            <ThemedText style={styles.statNum}>85%</ThemedText>
            <ThemedText style={styles.statLabel}>Consistencia</ThemedText>
          </View>
        </View>
      </View>

      {/* Selector de día de entrenamiento */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dayScroll}
      >
        {WORKOUT_PLAN.map((w, i) => (
          <TouchableOpacity
            key={w.day}
            style={[styles.dayChip, selectedDay === i && styles.dayChipActive, w.isRest && styles.dayChipRest]}
            onPress={() => setSelectedDay(i)}
            activeOpacity={0.8}
          >
            <ThemedText style={styles.dayChipEmoji}>{w.emoji}</ThemedText>
            <ThemedText style={[styles.dayChipLabel, selectedDay === i && styles.dayChipLabelActive]}>
              {w.day.slice(0, 3)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Detalle del día seleccionado */}
      <View style={styles.card}>
        <View style={styles.workoutHeader}>
          <View>
            <ThemedText style={styles.workoutDay}>{currentWorkout.day}</ThemedText>
            <ThemedText style={styles.workoutFocus}>{currentWorkout.emoji} {currentWorkout.focus}</ThemedText>
          </View>
          <View style={[styles.workoutBadge, currentWorkout.isRest && styles.workoutBadgeRest]}>
            <ThemedText style={[styles.workoutBadgeText, currentWorkout.isRest && styles.workoutBadgeTextRest]}>
              {currentWorkout.isRest ? 'Descanso' : `${completedExercises}/${currentDone.length}`}
            </ThemedText>
          </View>
        </View>

        {!currentWorkout.isRest && (
          <View style={styles.progressBg}>
            <View style={[
              styles.progressFill,
              { width: `${(completedExercises / currentDone.length) * 100}%` as any }
            ]} />
          </View>
        )}

        <View style={{ marginTop: currentWorkout.isRest ? 0 : 12 }}>
          {currentWorkout.exercises.map((ex, i) => (
            <TouchableOpacity
              key={ex}
              style={[styles.exStep, i === currentWorkout.exercises.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => !currentWorkout.isRest && toggleExercise(selectedDay, i)}
              activeOpacity={currentWorkout.isRest ? 1 : 0.7}
            >
              <View style={[
                styles.stepCheck,
                currentDone[i] && styles.stepCheckDone,
                currentWorkout.isRest && styles.stepCheckRest,
              ]}>
                {currentDone[i] && <ThemedText style={styles.stepCheckMark}>✓</ThemedText>}
                {currentWorkout.isRest && <ThemedText style={{ fontSize: 10 }}>—</ThemedText>}
              </View>
              <ThemedText style={[styles.stepText, currentDone[i] && styles.stepTextDone]}>
                {ex}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
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
      <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/male-detail')}>
        <ThemedText style={styles.ctaBtnText}>Ver mi plan completo →</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const BLUE = '#3B82F6';
const NAVY = '#1E3A5F';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F6FF' },
  content: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  greeting: { fontSize: 22, fontWeight: '700', color: '#1F2937' },
  date: { fontSize: 13, color: '#9CA3AF', marginTop: 2 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },

  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1F2937', marginBottom: 10, marginTop: 8 },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
  },

  // Sleep & Water
  rowTwo: { flexDirection: 'row', gap: 12, marginBottom: 0 },
  halfCard: { flex: 1 },
  trackTitle: { fontSize: 13, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  trackValue: { fontSize: 24, fontWeight: '800', color: NAVY },
  trackUnit: { fontSize: 13, fontWeight: '400', color: '#9CA3AF' },
  trackGoal: { fontSize: 10, color: '#9CA3AF', marginBottom: 8 },
  progressBg: { height: 7, backgroundColor: '#DBEAFE', borderRadius: 4, marginBottom: 4 },
  progressFill: { height: 7, backgroundColor: BLUE, borderRadius: 4 },
  trackBtns: { flexDirection: 'row', gap: 8, marginBottom: 6 },
  trackBtn: { flex: 1, backgroundColor: '#EFF6FF', borderRadius: 10, paddingVertical: 6, alignItems: 'center', borderWidth: 1, borderColor: '#BFDBFE' },
  trackBtnText: { fontSize: 18, color: NAVY, fontWeight: '700' },
  trackTip: { fontSize: 10, color: '#6B7280', marginTop: 4 },
  glassesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 4 },

  // Mood
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  moodBtn: { width: '30%', alignItems: 'center', backgroundColor: '#EFF6FF', borderRadius: 14, paddingVertical: 10, borderWidth: 1, borderColor: '#DBEAFE' },
  moodBtnActive: { backgroundColor: '#DBEAFE', borderColor: BLUE },
  moodEmoji: { fontSize: 22, marginBottom: 4 },
  moodLabel: { fontSize: 11, color: '#6B7280' },
  moodLabelActive: { color: NAVY, fontWeight: '600' },
  moodFeedback: { marginTop: 12, backgroundColor: '#EFF6FF', borderRadius: 12, padding: 12 },
  moodFeedbackText: { fontSize: 13, color: NAVY, lineHeight: 19, textAlign: 'center' },

  // Calendar
  calMonthTitle: { fontSize: 14, fontWeight: '700', color: '#374151', marginBottom: 8, textAlign: 'center' },
  calDaysHeader: { flexDirection: 'row', marginBottom: 4 },
  calDayHeader: { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '600', color: '#9CA3AF' },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calCell: { width: '14.28%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 100, marginVertical: 1 },
  calDayText: { fontSize: 12, fontWeight: '500' },
  calToday: { borderWidth: 2, borderColor: BLUE },
  calTodayText: { color: NAVY, fontWeight: '800' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12, marginBottom: 4 },
  legItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  legDot: { width: 10, height: 10, borderRadius: 5 },
  legLabel: { fontSize: 11, color: '#6B7280' },

  // Stats row
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 14 },
  statBox: { flex: 1, backgroundColor: '#EFF6FF', borderRadius: 12, padding: 10, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: NAVY },
  statLabel: { fontSize: 10, color: '#6B7280', textAlign: 'center', marginTop: 2 },

  // Day selector
  dayScroll: { gap: 10, paddingBottom: 4, marginBottom: 12 },
  dayChip: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, paddingVertical: 10, paddingHorizontal: 14, borderWidth: 1, borderColor: '#DBEAFE', minWidth: 62 },
  dayChipActive: { backgroundColor: '#DBEAFE', borderColor: BLUE },
  dayChipRest: { borderColor: '#E5E7EB' },
  dayChipEmoji: { fontSize: 20, marginBottom: 4 },
  dayChipLabel: { fontSize: 11, color: '#6B7280', fontWeight: '500' },
  dayChipLabelActive: { color: NAVY, fontWeight: '700' },

  // Workout detail
  workoutHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  workoutDay: { fontSize: 13, color: '#6B7280' },
  workoutFocus: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginTop: 2 },
  workoutBadge: { backgroundColor: '#DBEAFE', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  workoutBadgeRest: { backgroundColor: '#F3F4F6' },
  workoutBadgeText: { fontSize: 13, fontWeight: '700', color: NAVY },
  workoutBadgeTextRest: { color: '#9CA3AF' },

  // Exercise steps
  exStep: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#F3F4F6' },
  stepCheck: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: '#D1D5DB', alignItems: 'center', justifyContent: 'center' },
  stepCheckDone: { backgroundColor: BLUE, borderColor: BLUE },
  stepCheckRest: { backgroundColor: '#F3F4F6', borderColor: '#E5E7EB' },
  stepCheckMark: { color: '#fff', fontSize: 12, fontWeight: '700' },
  stepText: { fontSize: 14, color: '#374151' },
  stepTextDone: { color: '#9CA3AF', textDecorationLine: 'line-through' },

  // Tips
  tipsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  tipCard: { width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#DBEAFE', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  tipIcon: { fontSize: 22, marginBottom: 6 },
  tipTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  tipDesc: { fontSize: 12, color: '#6B7280', lineHeight: 17 },

  // CTA
  ctaBtn: { backgroundColor: NAVY, borderRadius: 14, paddingVertical: 15, alignItems: 'center', shadowColor: NAVY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 },
  ctaBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
});