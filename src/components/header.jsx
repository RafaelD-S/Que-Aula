import Reset from '../assets/recarregar.svg'

export default function Header() {
  return (
    <header>
      <h1>Que Aula?</h1>
        <figure className='reset' onClick={() => location.reload()}>
            <img src={Reset} alt="reset" />
        </figure>
    </header>
  );
}
