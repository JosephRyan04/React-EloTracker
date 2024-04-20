import Sidebar from './Sidebar';

export default function Body({ sidebar, children }) {
  return (
    <div className='content-container d-flex flex-row justify-content-center'>
        {sidebar &&  
        <>
        <Sidebar />
        <div className='content-area sidebar-margin'>{children}</div>
        </>}
        {!sidebar &&
        <div className='content-area'>{children}</div>}
      
      </div>

      
  );
}
