import Routes from '@/router';
import BusHeader from '@/components/common/BusHeader';
import BusFooter from '@/components/common/BusFooter';

function App() {
  return (
    <div>
      <BusHeader />
      <Routes />
      <BusFooter />
    </div>
  )
}

export default App;
