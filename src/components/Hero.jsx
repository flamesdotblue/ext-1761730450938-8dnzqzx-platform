import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <header className="relative h-[360px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-neutral-950 pointer-events-none" />

      <div className="relative z-10 flex h-full w-full items-end justify-center pb-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">FinTrack</h1>
          <p className="mt-1 text-sm text-white/80">Your daily finance tracker</p>
        </div>
      </div>
    </header>
  );
}
