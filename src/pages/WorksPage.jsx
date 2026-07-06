import React from 'react';
import { useLocation } from 'react-router-dom';
import Works from '../components/Works';

export default function WorksPage() {
  const location = useLocation();
  const defaultFilter = location.state?.filter || 'all';

  return (
    <div style={{ paddingTop: '2.5rem' }}>
      <Works defaultFilter={defaultFilter} />
    </div>
  );
}
