import type { HTMLCode as HTMLCodeProps } from '../../@generated/cms/HtmlCode'

const HtmlCode = ({ html }: HTMLCodeProps) => {
  return <section dangerouslySetInnerHTML={{ __html: html }} />
}

export default HtmlCode
