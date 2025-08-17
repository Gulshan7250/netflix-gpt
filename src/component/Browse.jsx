import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();

  return (
    <div>
      <Header/>
      {
        showGptSearch ? (
          <GptSearch/>
        ) : (
          <>
            <MainContainer/>
            <SecondaryContainer/>
          </>
        )
      }
      {/* 

        MainContainer
          - VideoBackGround
          - VideoTitle
        SeceondoryContainer
          - MoviesList * n
              - cards * n
      */}
    </div>
  )
}

export default Browse  