export function useWeather(cuaca) {
  if (!cuaca) {
    return {
      risk: 'aman',
      actionTitle: 'Memuat cuaca',
      actionDescription: 'Menunggu data cuaca dari BMKG',
    };
  }

  if (cuaca.hujan >= 20) {
    return {
      risk: 'bahaya',
      actionTitle: 'Hujan Lebat Terdeteksi',
      actionDescription:
        'Tunda penyemprotan, periksa drainase, dan lindungi tanaman dari genangan.',
    };
  }

  if (cuaca.suhu >= 32) {
    return {
      risk: 'waspada',
      actionTitle: 'Cuaca Panas',
      actionDescription:
        'Tambahkan penyiraman pagi/sore untuk mencegah stres tanaman.',
    };
  }

  return {
    risk: 'aman',
    actionTitle: 'Cuaca Stabil',
    actionDescription:
      'Lanjutkan perawatan rutin dan pemantauan harian.',
  };
}
