export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>
      <h3>HTML Examples</h3>
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        Text documents are often broken up into several sections and
        subsections. Each section is usually prefaced with a short title or
        heading that attempts to summarize the topic of the section it precedes.
        For instance this paragraph is preceded by the heading Heading Tags. The
        font of the section headings are usually larger and bolder than their
        subsection headings. This document uses headings to introduce topics
        such as HTML Documents, HTML Tags, Heading Tags, etc. HTML heading tags
        can be used to format plain text so that it renders in a browser as
        large headings. There are 6 heading tags for different sizes: h1, h2,
        h3, h4, h5, and h6. Tag h1 is the largest heading and h6 is the smallest
        heading.
      </div>
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          This is a paragraph. We often separate a long set of sentences with
          vertical spaces to make the text easier to read. Browsers ignore
          vertical white spaces and render all the text as one single set of
          sentences. To force the browser to add vertical spacing, wrap the
          paragraphs you want to separate with the paragraph tag
        </p>
        <p id="wd-p-2">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default
          browsers render them as one contiguous piece of text as shown here on
          the right.
        </p>
        <p id="wd-p-4">
          This is the third paragraph. Wrap each paragraph with the paragraph
          tag to tell browsers
        </p>
      </div>
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>
        My favorite recipe: Scrambled Egg with Tomato
        <ol id="wd-your-favorite-recipe">
          <li>
            Beat the eggs: Crack 3 eggs into a bowl, add a pinch of salt, and
            beat well.
          </li>
          <li>
            Cook the eggs: Heat some oil in a pan, scramble the eggs until just
            set, then remove and set aside.
          </li>
          <li>
            Cook the tomatoes: In the same pan, add chopped tomatoes and stir
            for 2-3 minutes.
          </li>
          <li>
            Combine: Add the scrambled eggs back to the pan with the tomatoes.
            Stir and cook for 1-2 more minutes.
          </li>
          <li>
            Serve: Season with salt, sugar, soy sauce and ketchup and enjoy with
            rice!
          </li>
        </ol>
        <h5>Unordered List Tag</h5>
        My favorite books (in no particular order)
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender's Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>
        Your favorite books (in no particular order)
        <ul id="wd-your-books">
          <li>The Great Gatsby</li>
          <li>1984</li>
          <li>Pride and Prejudice</li>
        </ul>
      </div>
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Q1</td>
              <td>HTML</td>
              <td>2/3/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q2</td>
              <td>CSS</td>
              <td>2/10/21</td>
              <td>90</td>
            </tr>
            <tr>
              <td>Q3</td>
              <td>JavaScript</td>
              <td>2/17/21</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q4</td>
              <td>Java</td>
              <td>2/24/21</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Q5</td>
              <td>Python</td>
              <td>3/3/21</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Q6</td>
              <td>Machine Leaning</td>
              <td>3/10/21</td>
              <td>80</td>
            </tr>
            <tr>
              <td>Q7</td>
              <td>AI</td>
              <td>3/17/21</td>
              <td>80</td>
            </tr>
            <tr>
              <td>Q8</td>
              <td>Computer Vision</td>
              <td>3/24/21</td>
              <td>95</td>
            </tr>
            <tr>
              <td>Q9</td>
              <td>Cloud</td>
              <td>3/31/21</td>
              <td>85</td>
            </tr>
            <tr>
              <td>Q10</td>
              <td>Database</td>
              <td>4/7/21</td>
              <td>90</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Average</td>
              <td>90</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div id="wd-images">
        <h4>Image tag</h4>
        Loading an image from the internet:
        <br />
        <img
          id="wd-starship"
          width="400px"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
        />
        <br />
        Loading a local image:
        <br />
        <img id="wd-teslabot" src="images/teslabot.jpg" height="200px" />
      </div>
      <div id="wd-forms">
        <h4>Form Elements</h4>
        <form id="wd-text-fields">
          <h5>Text Fields</h5>
          <label htmlFor="wd-text-fields-username">Username:</label>
          <input id="wd-text-fields-username" placeholder="jdoe" /> <br />
          <label htmlFor="wd-text-fields-password">Password:</label>
          <input
            type="password"
            id="wd-text-fields-password"
            value="123@#$asd"
          />
          <br />
          <label htmlFor="wd-text-fields-first-name">First name:</label>
          <input type="text" id="wd-text-fields-first-name" title="John" />{" "}
          <br />
          <label htmlFor="wd-text-fields-last-name">Last name:</label>
          <input
            type="text"
            id="wd-text-fields-last-name"
            placeholder="Doe"
            value="Wonderland"
            title="The last name"
          />{" "}
          <br />
          <label htmlFor="wd-text-fields-email"> Email: </label>
          <input
            type="email"
            placeholder="jdoe@somewhere.com"
            id="wd-text-fields-email"
          />
          <br />
          <label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
          <input
            type="number"
            id="wd-text-fields-salary-start"
            placeholder="1000"
            value="100000"
          />
          <br />
          <label htmlFor="wd-text-fields-rating"> Rating: </label>
          <input
            type="range"
            id="wd-text-fields-rating"
            placeholder="Doe"
            max="5"
            value="4"
          />
          <br />
          <label htmlFor="wd-text-fields-dob"> Date of birth: </label>
          <input type="date" id="wd-text-fields-dob" value="2000-01-21" />
          <br />
        </form>
      </div>
      <h5>Text boxes</h5>
      <label>Biography:</label>
      <br />
      <textarea id="wd-textarea" cols={30} rows={10}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel
        porta nisl, vitae maximus magna. Morbi dolor lorem, hendrerit eu urna
        vel, imperdiet pretium augue. Nunc facilisis feugiat orci eget placerat.
        Ut at elementum ante, nec auctor ligula. Donec facilisis efficitur eros
        non porta. Nulla blandit nisi leo, vel interdum justo convallis a. Sed
        quis blandit quam, id elementum nisi. Pellentesque leo nisl, placerat
        non pellentesque ac, varius ac urna. In hac habitasse platea dictumst.
        Cras at imperdiet erat, a aliquet risus. Nullam nec leo eget risus
        pellentesque laoreet. Sed egestas ullamcorper orci sit amet imperdiet.
        Ut nec scelerisque metus. Nulla gravida scelerisque risus, vel accumsan
        tortor egestas vel. Nunc iaculis maximus dui, sed lacinia dui fermentum
        ut. Nam euismod tellus vitae urna bibendum ornare. In sit amet metus vel
        augue facilisis finibus id nec massa. Integer magna massa, scelerisque
        sit amet arcu sit amet, pretium feugiat ante. Donec quis pellentesque
        massa. In ac justo vel risus gravida elementum. Vestibulum tincidunt
        dignissim nibh, ut eleifend justo pharetra eu. Vestibulum quis fringilla
        velit. Donec sodales, nulla ac condimentum luctus, lacus felis
        pellentesque neque, at vulputate ipsum ligula ut tellus. Vivamus metus
        turpis, ullamcorper nec mi sed, rutrum congue ex. Mauris facilisis ante
        condimentum lorem pharetra lobortis. Cras sed porta ipsum, vel venenatis
        nulla. Donec at est in eros malesuada egestas porttitor in ante. Cras
        aliquam porttitor consequat. Etiam semper in quam at molestie. Curabitur
        rhoncus, mi a sodales sagittis, massa urna tempor arcu, auctor bibendum
        libero eros vel orci. In nec varius augue, ut varius velit.
      </textarea>
      <h5 id="wd-buttons">Buttons</h5>
      <button
        id="wd-all-good"
        onClick={() => alert("Life is Good!")}
        type="button"
      >
        Hello World!
      </button>
      <h5>File upload</h5>
      <input id="wd-upload" type="file" />
      <h5 id="wd-radio-buttons">Radio buttons</h5>
      <label>Favorite movie genre:</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-comedy" />
      <label htmlFor="wd-radio-comedy">Comedy</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-drama" />
      <label htmlFor="wd-radio-drama">Drama</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-scifi" />
      <label htmlFor="wd-radio-scifi">Science Fiction</label>
      <br />
      <input type="radio" name="radio-genre" id="wd-radio-fantasy" />
      <label htmlFor="wd-radio-fantasy">Fantasy</label>
      <h5 id="wd-checkboxes">Checkboxes</h5>
      <label>Favorite movie genre:</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-comedy" />
      <label htmlFor="wd-chkbox-comedy">Comedy</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-drama" />
      <label htmlFor="wd-chkbox-drama">Drama</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-scifi" />
      <label htmlFor="wd-chkbox-scifi">Science Fiction</label>
      <br />
      <input type="checkbox" name="check-genre" id="wd-chkbox-fantasy" />
      <label htmlFor="wd-chkbox-fantasy">Fantasy</label>
      <h4 id="wd-dropdowns">Dropdowns</h4>
      <h5>Select one</h5>
      <label htmlFor="wd-select-one-genre"> Favorite movie genre: </label>
      <br />
      <select id="wd-select-one-genre">
        <option value="COMEDY">Comedy</option>
        <option value="DRAMA">Drama</option>
        <option selected value="SCIFI">
          Science Fiction
        </option>
        <option value="FANTASY">Fantasy</option>
      </select>
      <h5>Select many</h5>
      <label htmlFor="wd-select-many-genre"> Favorite movie genres: </label>
      <br />
      <select id="wd-select-many-genre" multiple>
        <option selected value="COMEDY">
          Comedy
        </option>
        <option value="DRAMA">Drama</option>
        <option selected value="SCIFI">
          Science Fiction
        </option>
        <option value="FANTASY">Fantasy</option>
      </select>
      <h4>Anchor tag</h4>
      Please{" "}
      <a id="wd-lipsum" href="https://www.lipsum.com">
        click here
      </a>{" "}
      to get dummy text
      <br />
    </div>
  );
}
