import Hero from '@/app/components/Hero';
import LoPrincipal from '@/app/components/LoPrincipal';
import Details from '@/app/components/Details';
import { machines } from '@/data/machines';

export default function MachinePage({ params }) {
  const { machine } = params;

  // Validamos que la máquina exista
  const data = machines[machine];

  if (!data) {
    return <h1>Máquina no encontrada</h1>;
  }

  return (
    <>
      <Hero data={data.hero} machine={machine} />
      <LoPrincipal data={data.loPrincipal} machine={machine} />
      <Details data={data.details} machine={machine} />
    </>
  );
}
