export default function Footer() {
  return (
    <footer className="sticky top-[100vh] text-center pb-2 tracking-wider">
      <p>
        {`Made with `}
        <span className="text-rose-500">♥️</span>
        {` by `}
        <a
          className="link"
          href="https://github.com/amimaro"
          target="_blank"
          rel="noopener noreferrer"
        >
          amimaro
        </a>
        {`. Powered by `}
        <a
          className="link"
          href="https://remix.run"
          target="_blank"
          rel="noopener noreferrer"
        >
          Remix.run
        </a>
      </p>
    </footer>
  );
}
