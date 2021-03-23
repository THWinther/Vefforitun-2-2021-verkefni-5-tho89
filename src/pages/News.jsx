import { useParams } from 'react-router';
import { News } from '../components/news/News';
export function NewsPage() {
  let id = useParams();
  return(
    <div>
      {News(id)}
    </div>
  );
}