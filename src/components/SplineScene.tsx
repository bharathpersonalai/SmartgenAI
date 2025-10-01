import Spline from '@splinetool/react-spline';

// We add { className } to accept styles from the parent
export default function SplineScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
    </div>
  );
}