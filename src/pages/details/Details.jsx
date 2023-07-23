import React from 'react';
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';
import UseFetch from '../../hooks/UseFetch';

const Details = () => {

  const { mediaType, id } = useParams();

  const {data, loading} = UseFetch(`/${mediaType}/${id}/videos`)

  const {data: credits, loading: creditsLoading} = UseFetch(`/${mediaType}/${id}/credits`)
  

  return (
    <div>
      <DetailsBanner video = {data?.results?.[0]} crew = {credits?.crew} />
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details;