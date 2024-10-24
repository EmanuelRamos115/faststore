import styles from './StyleGuide.module.scss'

const levels = [1, 2, 3, 4, 5] as const

const StyleGuideElements = () => {
  return (
    <>
      <div className={styles.card}>
        <h3>Headings</h3>

        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </div>

      <div className={styles.card}>
        <h3>Paragraph</h3>
        <p>
          This is a paragraph. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </p>
      </div>

      <div className={styles.card}>
        <h3>Anchor</h3>
        <a href="#">Link</a>
      </div>

      <div className={styles.card}>
        <h3>Button</h3>
        <button>Button</button>
      </div>

      <div className={styles.card}>
        <h3>Inputs</h3>
        <p>
          <label htmlFor="style-guide-inputs-type-button">type=button</label>
          <input
            id="style-guide-inputs-type-button"
            type="button"
            value="type=button"
          />
        </p>
        <p>
          <input id="style-guide-inputs-type-checkbox" type="checkbox" />
          <label htmlFor="style-guide-inputs-type-checkbox">
            type="checkbox"
          </label>
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-color">type="color"</label>
          <input id="style-guide-inputs-type-color" type="color" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-date">type="date"</label>
          <input id="style-guide-inputs-type-date" type="date" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-datetime--local">
            type="datetime-local"
          </label>
          <input
            id="style-guide-inputs-type-datetime--local"
            type="datetime-local"
          />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-email">type="email"</label>
          <input id="style-guide-inputs-type-email" type="email" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-file">type="file"</label>
          <input id="style-guide-inputs-type-file" type="file" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-image">type="image"</label>
          <input id="style-guide-inputs-type-image" type="image" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-month">type="month"</label>
          <input id="style-guide-inputs-type-month" type="month" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-number">type="number"</label>
          <input id="style-guide-inputs-type-number" type="number" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-password">
            type="password"
          </label>
          <input id="style-guide-inputs-type-password" type="password" />
        </p>
        <p>
          <input id="style-guide-inputs-type-radio" type="radio" />
          <label htmlFor="style-guide-inputs-type-radio">type="radio"</label>
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-range">type="range"</label>
          <input id="style-guide-inputs-type-range" type="range" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-reset">type="reset"</label>
          <input id="style-guide-inputs-type-reset" type="reset" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-search">type="search"</label>
          <input id="style-guide-inputs-type-search" type="search" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-submit">type="submit"</label>
          <input id="style-guide-inputs-type-submit" type="submit" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-tel">type="tel"</label>
          <input id="style-guide-inputs-type-tel" type="tel" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-text">type="text"</label>
          <input id="style-guide-inputs-type-text" type="text" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-time">type="time"</label>
          <input id="style-guide-inputs-type-time" type="time" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-url">type="url"</label>
          <input id="style-guide-inputs-type-url" type="url" />
        </p>
        <p>
          <label htmlFor="style-guide-inputs-type-week">type="week"</label>
          <input id="style-guide-inputs-type-week" type="week" />
        </p>
      </div>

      <div className={styles.card}>
        <h3>Unordered List</h3>
        <ul>
          <li>List Item 1</li>
          <li>List Item 2</li>
          <li>List Item 3</li>
        </ul>
      </div>

      <div className={styles.card}>
        <h3>Ordered List</h3>
        <ol>
          <li>Ordered List Item 1</li>
          <li>Ordered List Item 2</li>
          <li>Ordered List Item 3</li>
        </ol>
      </div>

      <div className={styles.card}>
        <h3>Blockquote</h3>
        <blockquote>
          This is a blockquote. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </blockquote>
      </div>

      <div className={styles.card}>
        <h3>Code</h3>
        <code>
          This is a code block. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
        </code>
      </div>

      <div className={styles.card}>
        <h3>Horizontal Rule</h3>
        <hr />
      </div>

      <div className={styles.card}>
        <h3>Table</h3>
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Column 1</td>
              <td>Row 1, Column 2</td>
              <td>Row 1, Column 3</td>
            </tr>
            <tr>
              <td>Row 2, Column 1</td>
              <td>Row 2, Column 2</td>
              <td>Row 2, Column 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StyleGuideElements
