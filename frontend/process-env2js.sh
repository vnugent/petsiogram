#!/bin/bash
if [ ! -z ${API_HOST} ] && [ ! -z ${MEDIA_HOST} ]; then
cat <<END
window.RUNTIME_API_HOST='${API_HOST}';
window.RUNTIME_MEDIA_HOST='${MEDIA_HOST}';
END
fi
