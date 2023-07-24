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
import { DashboardPage } from './components/pages/dashboard';
import { ViewArtDetail } from './components/pages/art-detail';
import { HomePage } from './components/pages/home-page';
import { UnauthorizedViewCities } from './components/pages/unauthorized/view-city';
import { UnauthorizedViewCountry } from './components/pages/unauthorized/view-country';
import { UnauthorizedViewCulturalCenters } from './components/pages/unauthorized/view-cultural-center';
import { Payment } from './components/account/payment';
import { PostLogin } from './components/pages/post-login';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post-login" element={<PostLogin />} />
        <Route path="/unauthorized/view-country" element={<UnauthorizedViewCountry />} />
        <Route path="/unauthorized/view-city/:country" element={<UnauthorizedViewCities />} />
        <Route path="/unauthorized/view-cultural-center/:cityId" element={<UnauthorizedViewCulturalCenters/>} />
        <Route path="/dashboard" element={<DashboardPage />} />
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
