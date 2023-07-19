// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, Route } from 'react-router-dom'
import styles from './app.module.css';

import NxWelcome from './nx-welcome';
import { ViewCities } from './components/pages/view-city';
import { ViewCulturalCenters } from './components/pages/view-cultural-center';
import { ViewArt } from './components/pages/view-art';
import { ViewUsers } from './components/admin/view-users';
import { ViewSuggestions } from './components/admin/view-suggestions';
import { ViewFeedback } from './components/admin/view-feedback';
import { ManageCulturalCenters } from './components/admin/manage-cultural-centers';
import { ManageArt } from './components/admin/manage-art';
import { ManagePlaces } from './components/admin/manage-places';
import { HomePage } from './components/pages/post-login';
import { ViewArtDetail } from './components/pages/art-detail';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/view-city/:country" element={<ViewCities />} />
        <Route path="/view-cultural-center/:cityId" element={<ViewCulturalCenters/>} />
        <Route path="/view-art/:culturalCenterId" element={<ViewArt />} />
        <Route path="/view-art-detail/:artId" element={<ViewArtDetail />} />
        <Route path="/admin" element={<ManagePlaces />} />
        <Route path="/admin/manage-users" element={<ViewUsers />} />
        <Route path="/admin/manage-cultural-centers/:cityId" element={<ManageCulturalCenters />} />
        <Route path="/admin/manage-art/:culturalCenterId" element={<ManageArt />} />
        <Route path="/admin/manage-places" element={<ManagePlaces />} />
        <Route path="/admin/view-suggestions" element={<ViewSuggestions />} />
        <Route path="/admin/view-feedback" element={<ViewFeedback />} />
      </Routes>
    </div>
  );
}

export default App;
