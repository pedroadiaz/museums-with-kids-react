import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation } from 'react-router-dom';


export const NavigationBreadcrumb = (props: {
    country?: string;
    city?: string;
    cityId?: string;
    culturalCenter?: string;
    culturalCenterId?: string;
    art?: string;
    isAuthorized: boolean;
}) => {
  const location = useLocation();
  const country = props.country ?? localStorage.getItem("country");
  const prefix = props.isAuthorized ? '' : '/unauthorized';
  if (props.country) {
    localStorage.setItem("country", props.country);
  }

  let city: string | null = props.city ?? localStorage.getItem("city");;
  let cityId: string | null = props.cityId ?? localStorage.getItem("cityId");
  if (props.cityId) {
    localStorage.setItem("cityId", props.cityId);
    if (props.city) {
      localStorage.setItem("city", props.city);
    }
  } else if (location.pathname === "/" || location.pathname.includes("/view-city")) {
    localStorage.removeItem("city");
    localStorage.removeItem("cityId");
  }

  let culturalCenter: string | null = null;
  if (props.culturalCenterId) {
    culturalCenter = props.culturalCenter ?? localStorage.getItem("culturalCenter");
    if (props.culturalCenter) {
      localStorage.setItem("culturalCenter", props.culturalCenter);
    }
  } else if (location.pathname === "/" || location.pathname.includes("view-city") || location.pathname.includes("view-cultural-center")) {
    localStorage.removeItem("culturalCenter");
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" href={props.isAuthorized ? "/dashboard" : "/unauthorized/view-country"}>
      {props.isAuthorized ? "Home" : "Country"}
    </Link>,

  ];

  if (city && cityId) {
    breadcrumbs.push(
        <Link
        underline="hover"
        key={country}
        color="inherit"
        href={`${prefix}/view-city/${country}`}        >
        {country}
        </Link>
    );
  } else {
    breadcrumbs.push(
        <Typography key={country} style={{ fontSize: "1em", color: "blue"}} >
            {country}
        </Typography>,
    )
  }
  

  if (culturalCenter && props.culturalCenterId) {
    breadcrumbs.push(
        <Link
        underline="hover"
        key={cityId}
        color="inherit"
        href={`${prefix}/view-cultural-center/${cityId}`}
        >
        {city}
        </Link>
    );

    if (location.pathname.includes("view-art/")) {
        breadcrumbs.push(
            <Typography key={culturalCenter} style={{ fontSize: "1em", color: "blue"}} >
                {culturalCenter}
            </Typography>,
        );
    }
  } else {
    breadcrumbs.push(
        <Typography key={cityId} style={{ fontSize: "1em", color: "blue"}} >
            {city}
        </Typography>,
    );
  }

  
  if (props.art) {
    breadcrumbs.push(
        <Link
        underline="hover"
        key={props.culturalCenterId}
        color="inherit"
        href={`${prefix}/view-art/${props.culturalCenterId}`}
        >
        {culturalCenter}
        </Link>,
        <Typography key={props.art} style={{ fontSize: "1em", color: "blue"}} >
            {props.art}
        </Typography>,
    );
  } 

  return (
    <Stack spacing={2}>
      <Breadcrumbs style={{ margin: "20px", fontSize: "1.5em", color: "blue"}} separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
