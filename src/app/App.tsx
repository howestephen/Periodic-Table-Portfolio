import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { CategoryPage } from './components/CategoryPage';
import { AboutPage } from './components/AboutPage';
import { PageTransition } from './components/PageTransition';
import { SEOHead } from './components/SEOHead';
import { ScrollToTop } from './components/ScrollToTop';

// Base path for GitHub Pages deployment
const basename = import.meta.env.BASE_URL || '/';

export default function App() {
  return (
    <Router basename={basename}>
      <SEOHead />
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
        <ScrollToTop />
      </PageTransition>
    </Router>
  );
}