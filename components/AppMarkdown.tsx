import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

const AppMarkdown = ({ children }: { children: string }) => {
  return (
    <>
      <ReactMarkdown
        components={{
          a: ({ href, ...props }) => {
            if (!href) {
              return <a {...props}></a>;
            }
            if (href.includes(window.location.origin)) {
              return <a {...props} rel="noopener noreferrer"></a>;
            }
            return (
              <Link href={href}>
                <a {...props}></a>
              </Link>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </>
  );
};

export default AppMarkdown;
