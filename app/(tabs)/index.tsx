import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Gender = 'male' | 'female' | null;

export default function HomeScreen() {
  const [selected, setSelected] = useState<Gender>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;
    if (selected === 'female') {
      router.push('/(tabs)/viewFemenino'); 
    } else {
      router.push('/viewMasculino'); 
    }
  };

  return (
    <LinearGradient
      colors={['#FFF0F5', '#F5F0FF']}
      style={styles.container}
    >
      <View style={styles.header}>
        <ThemedText style={styles.logo}>⟡</ThemedText>
      </View>

      {/* Título */}
      <View style={styles.titleBlock}>
        <ThemedText style={styles.title}>Bienvenido/a</ThemedText>
        <ThemedText style={styles.subtitle}>
          Elige tu perfil para personalizar tu experiencia
        </ThemedText>
      </View>

      <View style={styles.cards}>

        {/* Opción Femenino */}
        <TouchableOpacity
          style={[
            styles.card,
            selected === 'female' && styles.cardSelected,
            selected === 'female' && styles.cardFemale,
          ]}
          onPress={() => setSelected('female')}
          activeOpacity={0.85}
        >
          <ThemedText style={styles.cardEmoji}>♀</ThemedText>
          <ThemedText style={[
            styles.cardTitle,
            selected === 'female' && styles.cardTitleSelected,
          ]}>
            Femenino
          </ThemedText>
          <ThemedText style={[
            styles.cardDesc,
            selected === 'female' && styles.cardDescSelected,
          ]}>
            Ciclo, piel, cabello{'\n'}y bienestar femenino
          </ThemedText>
          {selected === 'female' && (
            <View style={styles.checkBadge}>
              <ThemedText style={styles.checkText}>✓</ThemedText>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            selected === 'male' && styles.cardSelected,
            selected === 'male' && styles.cardMale,
          ]}
          onPress={() => setSelected('male')}
          activeOpacity={0.85}
        >
          <ThemedText style={styles.cardEmoji}>♂</ThemedText>
          <ThemedText style={[
            styles.cardTitle,
            selected === 'male' && styles.cardTitleSelected,
          ]}>
            Masculino
          </ThemedText>
          <ThemedText style={[
            styles.cardDesc,
            selected === 'male' && styles.cardDescSelected,
          ]}>
            Barba, piel, cabello{'\n'}y cuidado masculino
          </ThemedText>
          {selected === 'male' && (
            <View style={[styles.checkBadge, styles.checkBadgeMale]}>
              <ThemedText style={styles.checkText}>✓</ThemedText>
            </View>
          )}
        </TouchableOpacity>

      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        style={[styles.continueBtn, !selected && styles.continueBtnDisabled]}
        onPress={handleContinue}
        activeOpacity={selected ? 0.85 : 1}
      >
        <ThemedText style={[
          styles.continueBtnText,
          !selected && styles.continueBtnTextDisabled,
        ]}>
          Continuar
        </ThemedText>
      </TouchableOpacity>

      <ThemedText style={styles.footer}>
        Puedes cambiar esto en cualquier momento desde ajustes
      </ThemedText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 50,
    fontWeight: '700',
    color: '#8B5CF6',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },

  // Título
  titleBlock: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },

  // Cards
  cards: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 32,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardSelected: {
    borderWidth: 2,
  },
  cardFemale: {
    borderColor: '#F472B6',
    backgroundColor: '#FFF0F7',
  },
  cardMale: {
    borderColor: '#60A5FA',
    backgroundColor: '#F0F6FF',
  },
  cardEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  cardTitleSelected: {
    color: '#1F2937',
  },
  cardDesc: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
  cardDescSelected: {
    color: '#6B7280',
  },

  // Check badge
  checkBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F472B6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBadgeMale: {
    backgroundColor: '#3B82F6',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Botón continuar
  continueBtn: {
    backgroundColor: '#8B5CF6',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  continueBtnDisabled: {
    backgroundColor: '#E5E7EB',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  continueBtnTextDisabled: {
    color: '#9CA3AF',
  },

  // Footer
  footer: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});