let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let contentElement = document.getElementById("slideContent");
let slideWindow = document.getElementById("slideShow");
let logger = document.getElementById("logger");
let thumbnails = Array.from(document.getElementsByClassName("thumbnail"));
let thumbnailIndexerWrapperes = Array.from(
  document.getElementsByClassName("thumbnail_indexer_wrapper")
);
let selectedThumbnailIndex = 0;

const log = (msg) => {
  if (logger === undefined) {
    return;
  }
  msg = msg.trim();
  logger.innerText += msg + "\n";
};

const moveTo = (index) => {
  let thumbnail = thumbnails[0];
  let thumbnailIndexerWrapper = thumbnailIndexerWrapperes[0];
  let num = -1 * index * slideWindow.clientWidth;
  console.log(thumbnailIndexerWrapperes, thumbnail.clientWidth);
  contentElement.style.left = num + "px";
  thumbnailIndexerWrapper.style.left =
    (thumbnail.clientWidth + 2) * index + "px";
};

const onClickThumbnail = (event) => {
  let id = event.target.id;
  let target = document.getElementById(id);
  let mat = id.match(/.*(\d+)$/);
  if (target === undefined || mat === undefined) {
    return;
  }
  selectedThumbnailIndex = Number(mat[1]);
  moveTo(selectedThumbnailIndex);
};

window.onload = () => {
  if (contentElement === undefined || slideWindow === undefined) {
    return;
  }
  let item_width = slideWindow.clientWidth;
  let content_width = contentElement.clientWidth;
  let num_of_contents = content_width / item_width;
  if (nextButton !== undefined) {
    nextButton.onclick = () => {
      selectedThumbnailIndex += 1;
      if (selectedThumbnailIndex >= num_of_contents) {
        selectedThumbnailIndex = 0;
      }
      moveTo(selectedThumbnailIndex);
    };
  }

  if (prevButton !== undefined) {
    prevButton.onclick = () => {
      selectedThumbnailIndex -= 1;
      if (selectedThumbnailIndex <= 0) {
        selectedThumbnailIndex = num_of_contents - 1;
      }
      moveTo(selectedThumbnailIndex);
    };
  }

  let touchX = undefined;
  contentElement.ontouchstart((e) => {
    touchX = e.touchX;
    log(touchX);
    //    console.log(touchX);
  });
  contentElement.ontouchmove((e) => {});
};
