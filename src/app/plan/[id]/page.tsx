'use client';
import PlanPage from '@client/features/plan-page/PlanPage';
import { useParams } from 'next/navigation';

export default function Plan() {
  const params = useParams();
  return <PlanPage id={params?.id} />;
}
