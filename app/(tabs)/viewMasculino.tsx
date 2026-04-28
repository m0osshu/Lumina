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

const GROOMING = [
  {
    time: 'Mañana',
    emoji: '☀️',
    steps: ['Limpiador facial', 'Hidratante SPF 30', 'Desodorante', 'Perfume'],
    done: [true, true, false, false],
  },
  {
    time: 'Noche',
    emoji: '🌙',
    steps: ['Limpiador doble', 'Sérum antioxidante', 'Crema de noche'],
    done: [false, false, false],
  },
];

const BEARD_TIPS = [
  { label: 'Lavado', desc: 'Lava tu barba con champú específico 2–3 veces por semana.', icon: '🧴' },
  { label: 'Hidratación', desc: 'Aplica aceite de barba después del lavado para evitar resequedad.', icon: '💧' },
  { label: 'Peinado', desc: 'Usa bálsamo para dar forma y controlar el pelo rebelde.', icon: '🪮' },
  { label: 'Recorte', desc: 'Recorta los bordes cada 3–4 días para mantener una línea limpia.', icon: '✂️' },
];

const FITNESS_STATS = [
  { label: 'Pasos hoy', value: '6,240', goal: '10,000', pct: 62 },
  { label: 'Agua', value: '1.4 L', goal: '2.5 L', pct: 56 },
  { label: 'Calorías', value: '1,820', goal: '2,400', pct: 76 },
];

const WELLNESS_TIPS = [
  { icon: '💪', title: 'Fuerza', desc: 'Hoy es buen día para entrena tren superior: pecho, hombros y tríceps.' },
  { icon: '🧘‍♂️', title: 'Estrés', desc: '5 minutos de respiración profunda reducen el cortisol significativamente.' },
  { icon: '🥩', title: 'Proteína', desc: 'Apunta a 1.6 g de proteína por kg de peso corporal para mantener músculo.' },
  { icon: '😴', title: 'Sueño', desc: '7–9 horas de sueño optimizan la testosterona y la recuperación muscular.' },
];

export default function MaleHome() {
  const router = useRouter();
  const [groomingState, setGroomingState] = useState(GROOMING);

  const toggleStep = (routineIdx: number, stepIdx: number) => {
    setGroomingState((prev) =>
      prev.map((routine, ri) =>
        ri !== routineIdx
          ? routine
          : {
              ...routine,
              done: routine.done.map((d, si) => (si === stepIdx ? !d : d)),
            }
      )
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <ThemedText style={styles.greeting}>Hola, bienvenido 👋</ThemedText>
          <ThemedText style={styles.date}>Lunes, 27 de abril</ThemedText>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <ThemedText style={styles.avatarText}>A</ThemedText>
        </TouchableOpacity>
      </View>

      {/* ── RESUMEN DEL DÍA ── */}
      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { borderColor: '#BFDBFE' }]}>
          <ThemedText style={styles.summaryIcon}>🧔</ThemedText>
          <ThemedText style={styles.summaryValue}>Día 3</ThemedText>
          <ThemedText style={styles.summaryLabel}>desde recorte</ThemedText>
        </View>
        <View style={[styles.summaryCard, { borderColor: '#BBF7D0' }]}>
          <ThemedText style={styles.summaryIcon}>✅</ThemedText>
          <ThemedText style={styles.summaryValue}>2/7</ThemedText>
          <ThemedText style={styles.summaryLabel}>pasos rutina</ThemedText>
        </View>
        <View style={[styles.summaryCard, { borderColor: '#FED7AA' }]}>
          <ThemedText style={styles.summaryIcon}>🔥</ThemedText>
          <ThemedText style={styles.summaryValue}>5 días</ThemedText>
          <ThemedText style={styles.summaryLabel}>racha activa</ThemedText>
        </View>
      </View>

      {/* ── GROOMING / RUTINA ── */}
      <ThemedText style={styles.sectionTitle}>Rutina de cuidado</ThemedText>

      {groomingState.map((routine, ri) => (
        <View key={routine.time} style={styles.groomingCard}>
          <View style={styles.groomingHeader}>
            <ThemedText style={styles.groomingTime}>
              {routine.emoji} {routine.time}
            </ThemedText>
            <ThemedText style={styles.groomingDone}>
              {routine.done.filter(Boolean).length}/{routine.steps.length} pasos
            </ThemedText>
          </View>
          {routine.steps.map((step, si) => (
            <TouchableOpacity
              key={step}
              style={styles.groomingStep}
              onPress={() => toggleStep(ri, si)}
              activeOpacity={0.7}
            >
              <View style={[styles.stepCheck, routine.done[si] && styles.stepCheckDone]}>
                {routine.done[si] && (
                  <ThemedText style={styles.stepCheckMark}>✓</ThemedText>
                )}
              </View>
              <ThemedText
                style={[styles.stepText, routine.done[si] && styles.stepTextDone]}
              >
                {step}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* ── FITNESS ── */}
      <ThemedText style={styles.sectionTitle}>Actividad del día</ThemedText>

      <View style={styles.fitnessCard}>
        {FITNESS_STATS.map((stat, i) => (
          <View key={stat.label} style={[styles.fitRow, i < FITNESS_STATS.length - 1 && styles.fitRowBorder]}>
            <View style={styles.fitLeft}>
              <ThemedText style={styles.fitLabel}>{stat.label}</ThemedText>
              <View style={styles.fitBar}>
                <View style={[styles.fitFill, { width: `${stat.pct}%` as any }]} />
              </View>
            </View>
            <View style={styles.fitRight}>
              <ThemedText style={styles.fitValue}>{stat.value}</ThemedText>
              <ThemedText style={styles.fitGoal}>/ {stat.goal}</ThemedText>
            </View>
          </View>
        ))}
      </View>

      {/* ── CUIDADO DE BARBA ── */}
      <ThemedText style={styles.sectionTitle}>Cuidado de barba</ThemedText>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.beardScroll}
      >
        {BEARD_TIPS.map((tip) => (
          <View key={tip.label} style={styles.beardCard}>
            <ThemedText style={styles.beardIcon}>{tip.icon}</ThemedText>
            <ThemedText style={styles.beardLabel}>{tip.label}</ThemedText>
            <ThemedText style={styles.beardDesc}>{tip.desc}</ThemedText>
          </View>
        ))}
      </ScrollView>

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
  container: {
    flex: 1,
    backgroundColor: '#F0F6FF',
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
    marginBottom: 24,
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
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  // Resumen
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    alignItems: 'center',
    gap: 2,
  },
  summaryIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Section title
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 4,
  },

  // ── GROOMING ──
  groomingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  groomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  groomingTime: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
  },
  groomingDone: {
    fontSize: 12,
    color: BLUE,
    fontWeight: '600',
  },
  groomingStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 9,
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
    backgroundColor: BLUE,
    borderColor: BLUE,
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

  // ── FITNESS ──
  fitnessCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    shadowColor: BLUE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  fitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  fitRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#F3F4F6',
  },
  fitLeft: {
    flex: 1,
    marginRight: 16,
  },
  fitLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  fitBar: {
    height: 6,
    backgroundColor: '#DBEAFE',
    borderRadius: 3,
  },
  fitFill: {
    height: 6,
    backgroundColor: BLUE,
    borderRadius: 3,
  },
  fitRight: {
    alignItems: 'flex-end',
  },
  fitValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  fitGoal: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 1,
  },

  // ── BARBA ──
  beardScroll: {
    paddingBottom: 4,
    gap: 12,
    marginBottom: 24,
  },
  beardCard: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  beardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  beardLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  beardDesc: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 17,
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
    borderColor: '#DBEAFE',
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
    backgroundColor: NAVY,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: NAVY,
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