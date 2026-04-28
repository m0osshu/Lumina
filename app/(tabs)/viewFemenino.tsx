import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

const CYCLE_DAY = 10;
const CYCLE_LENGTH = 28;
const DAYS_TO_PERIOD = 8;

const PHASES = [
  { label: 'Menstrual', days: '1–5', active: false, color: '#F472B6' },
  { label: 'Folicular', days: '6–13', active: true, color: '#A78BFA' },
  { label: 'Ovulación', days: '14', active: false, color: '#34D399' },
  { label: 'Lútea', days: '15–28', active: false, color: '#FBBF24' },
];

const SKINCARE = [
  { time: 'Mañana', steps: ['Limpiador suave', 'Vitamina C', 'Hidratante SPF 50'], done: [true, true, false] },
  { time: 'Noche', steps: ['Limpiador doble', 'Sérum retinol', 'Crema nutritiva'], done: [false, false, false] },
];

const TIPS = [
  { icon: '💧', title: 'Hidratación', desc: 'En fase folicular tu piel produce menos sebo. Añade un sérum hidratante.' },
  { icon: '🥗', title: 'Nutrición', desc: 'Aumenta el hierro y folatos esta semana: espinacas, legumbres y frutos secos.' },
  { icon: '🏃‍♀️', title: 'Ejercicio', desc: 'Tu energía está al máximo. Ideal para entrenamientos de alta intensidad.' },
  { icon: '😴', title: 'Descanso', desc: 'Mantén un horario de sueño regular para equilibrar tus hormonas.' },
];

export default function FemaleHome() {
  const router = useRouter();
  const progress = (CYCLE_DAY / CYCLE_LENGTH) * 100;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.greeting}>Hola, bienvenida 👋</ThemedText>
          <ThemedText style={styles.date}>Lunes, 27 de abril</ThemedText>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <ThemedText style={styles.avatarText}>A</ThemedText>
        </TouchableOpacity>
      </View>

      {/* ── CICLO MENSTRUAL ── */}
      <ThemedText style={styles.sectionTitle}>Ciclo menstrual</ThemedText>

      <View style={styles.cycleCard}>
        {/* Día y cuenta regresiva */}
        <View style={styles.cycleTop}>
          <View>
            <ThemedText style={styles.cycleDay}>Día {CYCLE_DAY}</ThemedText>
            <ThemedText style={styles.cyclePhase}>Fase folicular</ThemedText>
          </View>
          <View style={styles.countdown}>
            <ThemedText style={styles.countdownNum}>{DAYS_TO_PERIOD}</ThemedText>
            <ThemedText style={styles.countdownLabel}>días para{'\n'}tu período</ThemedText>
          </View>
        </View>

        {/* Barra de progreso */}
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
        </View>
        <View style={styles.progressLabels}>
          <ThemedText style={styles.progressLabel}>Día 1</ThemedText>
          <ThemedText style={styles.progressLabel}>Día 28</ThemedText>
        </View>

        {/* Fases */}
        <View style={styles.phases}>
          {PHASES.map((p) => (
            <View key={p.label} style={[styles.phaseChip, p.active && { backgroundColor: p.color + '22', borderColor: p.color }]}>
              <View style={[styles.phaseDot, { backgroundColor: p.color }]} />
              <View>
                <ThemedText style={[styles.phaseLabel, p.active && { color: p.color }]}>{p.label}</ThemedText>
                <ThemedText style={styles.phaseDays}>{p.days}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Síntomas rápidos */}
        <ThemedText style={styles.symptomsTitle}>¿Cómo te sientes hoy?</ThemedText>
        <View style={styles.symptomsRow}>
          {['😊 Bien', '😔 Triste', '😤 Irritable', '😴 Cansada', '🤕 Dolor'].map((s) => (
            <TouchableOpacity key={s} style={styles.symptomChip}>
              <ThemedText style={styles.symptomChipText}>{s}</ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── SKINCARE ── */}
      <ThemedText style={styles.sectionTitle}>Rutina de skincare</ThemedText>

      {SKINCARE.map((routine) => (
        <View key={routine.time} style={styles.skincareCard}>
          <View style={styles.skincareHeader}>
            <ThemedText style={styles.skincareTime}>{routine.time === 'Mañana' ? '☀️' : '🌙'} {routine.time}</ThemedText>
            <ThemedText style={styles.skincareDone}>
              {routine.done.filter(Boolean).length}/{routine.steps.length} pasos
            </ThemedText>
          </View>
          {routine.steps.map((step, i) => (
            <View key={step} style={styles.skincareStep}>
              <View style={[styles.stepCheck, routine.done[i] && styles.stepCheckDone]}>
                {routine.done[i] && <ThemedText style={styles.stepCheckMark}>✓</ThemedText>}
              </View>
              <ThemedText style={[styles.stepText, routine.done[i] && styles.stepTextDone]}>
                {step}
              </ThemedText>
            </View>
          ))}
        </View>
      ))}

      {/* ── TIPS DE BIENESTAR ── */}
      <ThemedText style={styles.sectionTitle}>Tips de bienestar</ThemedText>

      <View style={styles.tipsGrid}>
        {TIPS.map((tip) => (
          <View key={tip.title} style={styles.tipCard}>
            <ThemedText style={styles.tipIcon}>{tip.icon}</ThemedText>
            <ThemedText style={styles.tipTitle}>{tip.title}</ThemedText>
            <ThemedText style={styles.tipDesc}>{tip.desc}</ThemedText>
          </View>
        ))}
      </View>

      {/* Botón ver ciclo completo */}
      <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/cycle-detail')}>
        <ThemedText style={styles.ctaBtnText}>Ver detalle del ciclo →</ThemedText>
      </TouchableOpacity>

    </ScrollView>
  );
}

const PINK = '#F472B6';
const PURPLE = '#A78BFA';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5FB',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  date: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: PINK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  // Section title
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 8,
  },

  // ── CICLO ──
  cycleCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    shadowColor: PINK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  cycleTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cycleDay: {
    fontSize: 28,
    fontWeight: '700',
    color: PINK,
  },
  cyclePhase: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  countdown: {
    alignItems: 'flex-end',
  },
  countdownNum: {
    fontSize: 36,
    fontWeight: '800',
    color: PURPLE,
    lineHeight: 40,
  },
  countdownLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'right',
    lineHeight: 16,
  },

  // Progress bar
  progressBg: {
    height: 8,
    backgroundColor: '#FCE7F3',
    borderRadius: 4,
    marginBottom: 4,
  },
  progressFill: {
    height: 8,
    backgroundColor: PINK,
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 11,
    color: '#9CA3AF',
  },

  // Fases
  phases: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  phaseChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  phaseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  phaseLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  phaseDays: {
    fontSize: 10,
    color: '#9CA3AF',
  },

  // Síntomas
  symptomsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  symptomsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomChip: {
    backgroundColor: '#FDF2F8',
    borderWidth: 1,
    borderColor: '#FBCFE8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  symptomChipText: {
    fontSize: 13,
    color: '#BE185D',
  },

  // ── SKINCARE ──
  skincareCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  skincareHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  skincareTime: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  skincareDone: {
    fontSize: 12,
    color: PURPLE,
    fontWeight: '600',
  },
  skincareStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F3F4F6',
  },
  stepCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCheckDone: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  stepCheckMark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  stepText: {
    fontSize: 14,
    color: '#374151',
  },
  stepTextDone: {
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },

  // ── TIPS ──
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  tipCard: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  tipIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  tipDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
  },

  // CTA
  ctaBtn: {
    backgroundColor: PINK,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: PINK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});